# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP : http://ec2-3-135-197-193.us-east-2.compute.amazonaws.com
3. SSH username: ubuntu
4. SSH key : Team_5_key_pair.pem
4. Database URL or IP and port used: http://ec2-3-135-197-193.us-east-2.compute.amazonaws.com port:3306
5. Database username: root
6. Database password: gamer
7. Database name (basically the name that contains all your tables): team5vp
8. Instructions on how to use the above information.
    * Change key permisions locally: chmod 400 Team_5_key_pair.pem
    * To ssh into our ec2 instance: ssh -i "Team_5_key_pair.pem" ubuntu@ec2-3-135-197-193.us-east-2.compute.amazonaws.com 
    * To view running servers on ec2: sudo pm2 list
    * To use mySQL db: mysql -u root -p

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
