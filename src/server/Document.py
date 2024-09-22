class Document:
    def __init__(self,doc_id, doc_title, author, status, released_on, last_modified,stage, requestor, doc_type,department,reason_code,reason,summary,comp_date="",completed_days=0,elapsed_days=0,waiting_on=""):
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
        self.comp_date = comp_date
        self.commpleted_days = completed_days
        self.elapsed_days = elapsed_days
        self.waiting_on = waiting_on
        
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
                            'summary':self.summary,
                            'comp_date':self.comp_date,
                            'completed_days':self.commpleted_days,
                            'elapsed_days':self.elapsed_days,
                            'waiting_on':self.waiting_on}}