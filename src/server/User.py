class User():
    def __init__(self,user,name,email,role,title):
        self.user = user
        self.name = name
        self.email = email
        self.role = role
        self.title = title
        
    def toJSON(self):
        return ({"User":{'user':self.user,
                        'name':self.name,
                        'email':self.email,
                        'role': self.role,
                        'title': self.title}})