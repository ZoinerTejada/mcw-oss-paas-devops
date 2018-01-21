md c:\MongoExport
cd c:\Program Files\MongoDB\Server\3.6\bin
mongoexport --db best-for-you-organics --collection plans --out c:\MongoExport\plans.json
mongoexport --db best-for-you-organics --collection users --out c:\MongoExport\users.json
mongoexport --db best-for-you-organics --collection orders --out c:\MongoExport\orders.json