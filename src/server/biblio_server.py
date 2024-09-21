from flask import Flask
from flask_cors import CORS, cross_origin
import psycopg2
import psycopg2.extras
import os
from flask import jsonify, json
from flask import g

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class Document:
    def __init__(self,doc_id, doc_title, author, status, released_on, last_modified,stage, requestor, doc_type,department,reason_code,reason,summary):
        self.doc_id =doc_id
        self.doc_title = doc_title
        self.author = author
        self.status = status
        self.released_on = released_on
        self.last_modified = last_modified
        self.stage = stage
        self.requestor = requestor
        self.doc_type = doc_type
        self.department = department
        self.reason_code = reason_code
        self.reason = reason
        self.summary = summary
        
        
    def toJSON(self):
        return {"Document":{'doc_id':self.doc_id, 
                            'doc_title':self.doc_title,
                            'author':self.author,
                            'status': self.status,
                            'released_on':self.released_on,
                            'last_modified':self.last_modified,
                            'stage':self.stage,
                            'requestor':self.requestor,
                            'doc_type':self.doc_type,
                            'department':self.department,
                            'reason_code':self.reason_code,
                            'reason':self.reason,
                            'summary':self.summary}}

def loadSettings():
    f = open(os.path.join(os.path.dirname(os.path.realpath(__file__)), "config.ini"),'r')
    settings = {}
    for line in f:
        # print(line)
        key,value = line.split(" : ")
        settings[key]=value.strip()
    # print(settings)
    f.close()
    
    return settings

def get_db():
    if 'db' not in g:
        # g.db = sqlite3.connect(
        #     current_app.config['DATABASE'],
        #     detect_types=sqlite3.PARSE_DECLTYPES
        # )
        # g.db.row_factory = sqlite3.Row
        settings = loadSettings()
        g.db = psycopg2.connect(database=settings['database'],
                        host=settings['host'],
                        user=settings['user'],
                        password=settings['password'],
                        port=settings['port'])
        g.db.autocommit = True
        g.cursor = g.db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    return g.db, g.cursor

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()
        

@app.route('/document/mydoc', methods=['GET'])
def get_mydocs():
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document LIMIT 10")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        doc = Document(document['doc_id'], document['doc_title'], document['author'], document['status'], document['first_release'], document['last_modified'],document['stage'],document['requestor'],document['doc_type'],document['department'],document['doc_reason_code'],document['doc_reason'],document['doc_summary'])
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str
    # return jsonify({'documents': documents})
    
@app.route('/document/completed', methods=['GET'])
def get_completed():
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document where status='Completed' LIMIT 100")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        doc = Document(document['doc_id'], document['doc_title'], document['author'], document['status'], document['first_release'], document['last_modified'],document['stage'],document['requestor'],document['doc_type'],document['department'],document['doc_reason_code'],document['doc_reason'],document['doc_summary'])
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str

@app.route('/document/inprogress', methods=['GET'])
def get_inprogress():
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document where status='Out For Approval' LIMIT 100")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        doc = Document(document['doc_id'], document['doc_title'], document['author'], document['status'], document['first_release'], document['last_modified'],document['stage'],document['requestor'],document['doc_type'],document['department'],document['doc_reason_code'],document['doc_reason'],document['doc_summary'])
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str

@app.route('/document/rejected', methods=['GET'])
def get_rejected():
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document where status='Rejected' LIMIT 100")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        doc = Document(document['doc_id'], document['doc_title'], document['author'], document['status'], document['first_release'], document['last_modified'],document['stage'],document['requestor'],document['doc_type'],document['department'],document['doc_reason_code'],document['doc_reason'],document['doc_summary'])
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str

@app.route('/document/canceled', methods=['GET'])
def get_canceled():
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document where status='Canceled' LIMIT 100")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        doc = Document(document['doc_id'], document['doc_title'], document['author'], document['status'], document['first_release'], document['last_modified'],document['stage'],document['requestor'],document['doc_type'],document['department'],document['doc_reason_code'],document['doc_reason'],document['doc_summary'])
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str

@app.route('/document/view/<id>', methods=['GET'])
def get_document(id):
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document where doc_id='{id}' LIMIT 100")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        doc = Document(document['doc_id'], document['doc_title'], document['author'], document['status'], document['first_release'], document['last_modified'],document['stage'],document['requestor'],document['doc_type'],document['department'],document['doc_reason_code'],document['doc_reason'],document['doc_summary'])
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str

if __name__ == '__main__':
    app.run(debug=True)