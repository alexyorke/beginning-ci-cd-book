## **Dedicated script using Python** {#dedicated-script-using-python .unnumbered}

Here\'s the same functionality implemented in Python:

import json

import os

for filename in os.listdir(\"./data\"):

if filename.endswith(\".json\"):

with open(os.path.join(\"./data\", filename), \'r\') as f:

data = json.load(f)

name = data.get(\'name\')

print(f\"File: \'{filename}\', Name: \'{name}\'\")

content_copyUse code [[with caution]{.underline}](https://support.google.com/legal/answer/13505487).Python


