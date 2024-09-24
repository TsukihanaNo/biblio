class Comment():
    def __init__(self,user_id,comm_date,comment,type):
        self.user_id =user_id
        self.comm_date = comm_date
        self.comment = comment
        self.type = type
        
    def toJSON(self):
        return({"Comment":{'user_id':self.user_id,
                        'comm_date':self.comm_date,
                        'comment':self.comment,
                        'type':self.type}})