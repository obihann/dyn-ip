#!/bin/python
import http.client, urllib.parse
# get IP
conn = http.client.HTTPConnection("curlmyip.com")
conn.request("GET", "/")
r = conn.getresponse()
ip = r.read().rstrip()

# close conn
conn.close()

# post IP
postConn = http.client.HTTPConnection("dyn-ip.herokuapp.com")
params = urllib.parse.urlencode({'ip': ip})
headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
postConn.request("POST", "", params, headers)
response = postConn.getresponse()
data = response.read()
print(data)

# close conn
postConn.close()
