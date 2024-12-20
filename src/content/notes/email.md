---
title: Email
---

Email is easy to spoof and get into spam

## DNS settings

### SPF

- Sender Policy Framework
- DNS records - set which email can send as you
- Can only have one record

### DKIM

- Domain Keys Identified Mail
- Is a key pair, that proves it comes from the source
- Can have multiple record
- Has a encrypted header

### DMARC

- Domain-based Mail
- DNS set up as a domain name, anyone sending as you will automatically send it to spam.

### RUA reporting

- Get a report showing what is accepted

## Client settings

### S/MIME

- signs the email verifying the sender
- optionally encrypts the email
