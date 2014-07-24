import httplib, urllib
# get IP
conn = httplib.HTTPConnection("curlmyip.com")
conn.request("GET", "/")
r = conn.getresponse()
ip = r.read().rstrip()

# close conn
conn.close()

# post IP
postConn = httplib.HTTPConnection("localhost:3000")
params = urllib.urlencode({'ip': ip})
headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
postConn.request("POST", "", params, headers)
response = postConn.getresponse()
data = response.read()
print data

# close conn
postConn.close()
