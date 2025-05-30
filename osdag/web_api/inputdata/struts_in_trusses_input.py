from .input_data_base import InputDataBase
from rest_framework import status
from rest_framework.response import Response
from osdag.models import Columns, Beams, Bolt, Bolt_fy_fu, Material, CustomMaterials

class StrutsInTrussesInputData(InputDataBase):
    def process(self, **kwargs):
        connectivity, boltDiameter = kwargs["connectivity"], kwargs["boltDiameter"]
        propertyClass, thickness, email  = kwargs["propertyClass"], kwargs["thickness"], kwargs["email"]
        
        if (connectivity is None and boltDiameter is None and propertyClass is None and thickness is None):
            # fetch the list of all the connectivity options for End-Plate-Connection
            print("\n\n")
            print('inside connectivtityList handling ')
            print("\n\n")
            connectivityList = ['Angles' , 'Back to Back Angles - Same side of gusset', 'Back to Back Angles - Opposite side of gusset']
            materialList = list(Material.objects.filter().values())
            
            if email: 
                custom_material = list(CustomMaterials.objects.filter(email=email).values())
                materialList = materialList + custom_material

                materialList.append({"id": -1, "Grade": 'Custom'})

            response = {
                'connectivityList': connectivityList,
                'materialList': materialList
            }
            return Response(response, status=status.HTTP_200_OK)
        return super().process(kwargs)