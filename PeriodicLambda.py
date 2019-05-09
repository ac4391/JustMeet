from __future__ import print_function
import json
import boto3
import time
import itertools
from collections import defaultdict
from math import sin, cos, sqrt, atan2, radians

client = boto3.resource('dynamodb', region_name='us-west-2')
sns = boto3.client('sns')

timeThresh = time.time() - 86400 # 1 day
distThresh = 2000 # in meters

# Main Lambda function
def lambda_handler(event, context):
    # Get all entries from the Locations table
    table = client.Table('Location-giaqxovq4fdxhemgb7t6x7vsdy-dev')
    response = table.scan()
    items = response['Items']
    
    # remove items posted before the time threshold (default is 1 day ago)
    items = [x for x in items if x['timestamp']>timeThresh]
    
    # Get all unique user emails
    emails = set([item['email'] for item in items])

    table = client.Table('Applicant-giaqxovq4fdxhemgb7t6x7vsdy-dev')
    response = table.scan()
    applicants = response['Items']
    
    # Filter users that don't have a professional field
    applicants = [app for app in applicants if 'professionalField' in app]
    applicant_emails = [app['email'] for app in applicants]
    
    # list of emails that have posted in the last day and have a professional field
    emails = list(emails.intersection(applicant_emails))

    # Get users' professional field and latest location
    users = {}
    for email in emails:
        user_items = [x for x in items if x['email']==email]
        latestEntry = max(user_items, key=lambda x:x['timestamp'])
        user = [d for d in applicants if d['email']==email][0]
        field= user['professionalField']

        users[email] = {'latestEntry': latestEntry,
                        'professionalField': field}
        
    # Get a unique list of professional fields
    fields = set([d['professionalField'] for d in applicants])    
    
    for field in fields:
        # Get all users that are interested in this field
        field_users = {k:v for (k,v) in users.items() if v['professionalField']==field}
        
        # Get closest user and closest distance for each user
        closest_users = get_closest_users(field_users)

        # Check pair-wise to combinations of users
        for a, b in itertools.combinations(closest_users.items(), 2):
            # Ensure closest user is mutual between 2 users
            email_a, closest_a = a
            [(closest_a, dist_a)] = closest_a.items()
            email_b, closest_b = b
            [(closest_b, dist_b)] = closest_b.items()
            if email_a==closest_b and email_b==closest_a and\
                        dist_a<distThresh and dist_b<distThresh:
                
                # If closest user is mutual, send message to each user
                user_a = [app for app in applicants if app['email']==email_a][0]
                user_b = [app for app in applicants if app['email']==email_b][0]
                
                SendMessage(user=user_a, match=user_b)
                SendMessage(user=user_b, match=user_a)
        
        
def get_closest_users(users):
    closest_users = {}
    emails = [k for k in users.keys()] # list of email adresses
    
    if len(emails) <= 1:
        return None
    user_distances = {email:{} for email in emails}
    
    # Iterate through each possible pair combination of users
    for a, b in itertools.combinations(emails, 2):
        # Location tied to current email address
        lon_a = users[a]['latestEntry']['lon']
        lat_a = users[a]['latestEntry']['lat']
        lon_b = users[b]['latestEntry']['lon']
        lat_b = users[b]['latestEntry']['lat']
        dist = dist_two_points(lon_a, lat_a, lon_b, lat_b)
        user_distances[a][b] = dist
        user_distances[b][a] = dist
    
    # Get closest user for each user
    for email, distances in user_distances.items():
        closest = [{x:dist} for x, dist in sorted(distances.items(), key=lambda pair:pair[1])][0]
        closest_users[email] = closest
        
    return closest_users
        
def SendMessage(user, match):
    """Helper function to send an AWS SNS message to a user"""

    message = ('New Message from JustMeet:\n'
            '{} is in your area and also interested in a career as a {}. '
            'If you\'d like to Just Meet, contact them via phone: {} or email: {}')\
            .format(match['firstName'], match['professionalField'], match['phone'], match['email'])
    sns.publish(
            PhoneNumber = user['phone'],
            Message = message)
 
def dist_two_points(lon1, lat1, lon2, lat2):
    """Helper function to calculate the distance between two coordinates in meters"""
    # approximate radius of earth in km
    R = 6373.0

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)
    
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c
    return distance*1000 # conversion to meters

   