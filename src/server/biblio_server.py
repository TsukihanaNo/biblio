from flask import Flask
from flask_cors import CORS, cross_origin
import psycopg2
import psycopg2.extras
import os
import jwt
import html2text
from flask import Flask, request, jsonify, make_response, render_template, session, flash,g
from functools import wraps
from datetime import datetime, timedelta
from Document import *
from Part import *
from Attachment import *
from Signature import *
from Comment import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'KEEP_IT_A_SECRET'
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
        
def getWaitingUser(doc_id,cursor):
    users = []
    usr_str = ""
    cursor.execute(f"select user_id from signatures where doc_id='{doc_id}' and signed_date is Null and type='Signing'")
    results = cursor.fetchall()
    for result in results:
        if result is not None:
            users.append(result[0])
    count = 0
    for user in users:
        usr_str += user
        if count<len(users)-1:
            usr_str+=","
        count+=1
    return usr_str

def getElapsedDays(day1):
    if day1 is None:
        return 0
    
    today  = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    day2 = datetime.strptime(today,'%Y-%m-%d %H:%M:%S')
    day1 = datetime.strptime(day1,'%Y-%m-%d %H:%M:%S')
    elapsed = day2 - day1
    elapsed_days = "{:.2f}".format(elapsed.days + round(elapsed.seconds/86400,2))

    return elapsed_days

def createDocument(document,elapsed="",waiting_on=""):
    if document['doc_reason'] is None:
        document['doc_reason']=""
    if document['doc_summary'] is None:
        document['doc_summary']=""
    return Document(document['doc_id'], document['doc_title'], document['author'], document['status'], document['first_release'], 
                    document['last_modified'],document['stage'],document['requestor'],document['doc_type'],document['department'],
                    document['doc_reason_code'],html2text.html2text(document['doc_reason']),html2text.html2text(document['doc_summary']),elapsed_days=elapsed,waiting_on=waiting_on)

@app.route('/login',methods=['GET','POST'])
def login():
    data = request.get_json()
    print(data)
    pass
    # return jsonify({'token':'test123'})
        

@app.route('/document/mydoc', methods=['GET','POST'])
def get_mydocs():
    user = request.get_json()
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document where status !='Completed' and author='{user}'")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        waiting_on = getWaitingUser(document['doc_id'],cursor)
        elapsed = getElapsedDays(document['first_release'])
        doc = createDocument(document,elapsed,waiting_on)
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str
    # return jsonify({'documents': documents})
    
@app.route('/document/completed', methods=['GET','POST'])
def get_completed():
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document where status='Completed' order by first_release desc")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        doc = createDocument(document)
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str

@app.route('/document/inprogress', methods=['GET','POST'])
def get_inprogress():
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document where status='Out For Approval' and doc_id like 'ECN%'")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        waiting_on = getWaitingUser(document['doc_id'],cursor)
        elapsed = getElapsedDays(document['first_release'])
        doc = createDocument(document,elapsed,waiting_on)
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str

@app.route('/document/rejected', methods=['GET','POST'])
def get_rejected():
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document where status='Rejected' and doc_id like 'ECN%'")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        doc = createDocument(document)
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str

@app.route('/document/canceled', methods=['GET','POST'])
def get_canceled():
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document where status='Canceled' and doc_id like 'ECN%'")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        doc = createDocument(document)
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str

@app.route('/document/view/<id>', methods=['GET','POST'])
def get_document(id):
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM document where doc_id='{id}'")
    documents = cursor.fetchall()
    document_list = []
    for document in documents:
        waiting_on = getWaitingUser(document['doc_id'],cursor)
        doc = createDocument(document,waiting_on=waiting_on)
        document_list.append(doc)
    json_str = jsonify([d.toJSON() for d in document_list])
    return json_str

@app.route('/part/<id>/get', methods=['GET'])
def get_parts(id):
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM parts where doc_id='{id}'")
    parts = cursor.fetchall()
    parts_list = []
    for part in parts:
        p = Part(part['part_id'],part['type'],part['description'],part['disposition'],part['mfg'],part['mfg_part'],part['replacing'],part['inspection'],part['reference'],part['disposition_old'])
        parts_list.append(p)
    json_str = jsonify([p.toJSON() for p in parts_list])
    return json_str

@app.route('/attachment/<id>/get', methods=['GET'])
def get_attachments(id):
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM attachments where doc_id='{id}'")
    attachments = cursor.fetchall()
    attachment_list = []
    for attachment in attachments:
        a = Attachment(attachment['filename'],attachment['filepath'])
        attachment_list.append(a)
    json_str = jsonify([a.toJSON() for a in attachment_list])
    return json_str

@app.route('/signature/<id>/get', methods=['GET'])
def get_signature(id):
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM signatures where doc_id='{id}' and type='Signing'")
    signatures = cursor.fetchall()
    signature_list = []
    for signature in signatures:
        s = Signature(signature['name'],signature['job_title'],signature['signed_date'])
        signature_list.append(s)
    json_str = jsonify([s.toJSON() for s in signature_list])
    return json_str

@app.route('/comment/<id>/get', methods=['GET'])
def get_comments(id):
    db,cursor = get_db()
    cursor.execute(f"SELECT * FROM comments where doc_id='{id}'")
    comments = cursor.fetchall()
    comment_list = []
    for comment in comments:
        c = Comment(comment['user_id'],comment['comm_date'],comment['comment'],comment['type'])
        comment_list.append(c)
    json_str = jsonify([c.toJSON() for c in comment_list])
    return json_str

@app.route('/auth', methods=['GET','POST'])
def auth():
    # if request.form['username'] and request.form['password'] == '123456':
        # session['logged_in'] = True
    token = jwt.encode({
        'user': 'lily',
        'expiration': str(datetime.now() + timedelta(minutes=50))
    }, app.config['SECRET_KEY'])

    return jsonify({'message':'success','token': token})
    # else:
    #     return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication Failed"'})
    
def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message': 'Invalid token'}), 403

        return func(*args, **kwargs)

    return decorated


if __name__ == '__main__':
    app.run(debug=True)