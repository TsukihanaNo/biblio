class Attachment():
    def __init__(self,filename, filepath):
        self.filename = filename
        self.filepath = filepath
        
    def toJSON(self):
        return({"Attachment":{'filename':self.filename,
                            'filepath':self.filepath}})