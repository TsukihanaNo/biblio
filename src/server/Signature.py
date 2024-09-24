class Signature():
    def __init__(self,name,job_title,signed_date):
        self.name = name
        self.job_title = job_title
        self.signed_date = signed_date
        
    def toJSON(self):
        return ({"Signature":{'name':self.name,
                            'job_title':self.job_title,
                            'signed_date':self.signed_date}})