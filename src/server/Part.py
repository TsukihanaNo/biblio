class Part:
    def __init__(self,part_id,part_type,description,disposition,mfg,mfg_part,replacing, inspection,reference,disposition_old):
        self.part_id = part_id
        self.part_type = part_type
        self.description = description
        self.disposition = disposition
        self.mfg = mfg
        self.mfg_part = mfg_part
        self.replacing = replacing
        self.inspection = inspection
        self.reference = reference
        self.disposition_old = disposition_old
        
    def toJSON(self):
        return {"Part":{'part_id':self.part_id, 
                        'part_type':self.part_type,
                        'description':self.description,
                        'disposition': self.disposition,
                        'mfg':self.mfg,
                        'mfg_part':self.mfg_part,
                        'replacing':self.replacing,
                        'inspection':self.inspection,
                        'reference':self.reference,
                        'disposition_old':self.disposition_old}}