import httplib
conn = httplib.HTTPConnection("curlmyip.com")
conn.request("GET", "/")
r = conn.getresponse()
data = r.read()
print data
conn.close()
