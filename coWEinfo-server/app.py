from flask import Flask, request
import database_conn
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database ="hospitals"
)

my_cursor = mydb.cursor()
app = Flask(__name__)


@app.route("/register_patient", methods = ["POST"])
def register_patient():
    patient_values = request.get_json()
    print(patient_values)
     
    insert_patient(patient_values["name"], patient_values["city"], patient_values["pincode"], patient_values["email"], patient_values["phn_num"], patient_values["password"])
    return{"message": "Registration Successful!", "status": 1}
    

@app.route("/register_admin", methods = ["POST"])
def register_admin():
    admin_values = request.get_json()
    print(admin_values)
     
    insert_admin(admin_values["hospital_name"], admin_values["admin_name"], admin_values["city"], admin_values["pincode"], admin_values["phn_num"],admin_values["email"], admin_values["password"], admin_values["vaccination"],admin_values["total_beds"], admin_values["covid_beds"], admin_values["non_covid_beds"], admin_values["testing"], admin_values["address"])
    return{"message": "Registration Successful! Please go back to the login page to signin", "status": 1}


@app.route("/signin", methods = ["POST"])
def signin():
    signin_values = request.get_json()  #{email, password, role}
    
    if signin_values["role"] == "admin":
        signin_query = "SELECT `Password`, City FROM `admin` WHERE `Email_Hospital` = (%s)"
        email_id = (signin_values["email"],)

        my_cursor.execute(signin_query, email_id)
        results = my_cursor.fetchone()

        if signin_values["password"] == results[0]:
            return {"status": 1, "message":"Signin Successful", "city":results[1]}
        
        else:
            return{"status": 0, "message":"Incorrect Password"}


    if signin_values["role"] == "patient":
        
        signin_query = "SELECT `Password` from `patient` WHERE `Email`=(%s)"
        email_id=(signin_values["email"],)

        my_cursor.execute(signin_query, email_id)
        results = my_cursor.fetchone()

        for x in results:
            password = x
        
        if signin_values["password"] == password:
            return {"status": 1, "message":"Signin Successful"}
        
        else:
            return{"status": 0, "message":"Incorrect Password"}


@app.route("/update_beds", methods = ["POST"])
def update_bed_situation():
    beds = request.get_json()
    update_beds(beds["covid"], beds["non_covid"], beds["email"])
    return {"status": 1, "message": "Bed count updated successfully."}


@app.route("/hospitalsByCity/<string:city>")
def hospitalsByCity(city):
    list_query = "SELECT `Hospital_Name`, `Phone_Number`, `Email_Hospital`, `Vaccination`, `Covid`, `Non_covid`, `Testing`, `Address` FROM `admin` WHERE City=(%s);"
    values = (city,)

    my_cursor.execute(list_query, values)
    results = my_cursor.fetchall()

    return {"results": results}

@app.route("/getCurrentBeds/<string:email>")
def getCurrentBeds(email):
    request_beds = "SELECT `Hospital_Name`, `Admin_Name`, `Address`, `Email_Hospital`, `Phone_Number`,`Covid`, `Non_covid`, `City` from `admin` WHERE `Email_Hospital`=(%s)"
    values = (email,)

    my_cursor.execute(request_beds,values)

    result = my_cursor.fetchall()

    for x in result:
        beds = x

    return {"hospital_name": beds[0], "admin_name":beds[1], "address":beds[2], "email": beds[3], "phn_num":beds[4], "covid_beds":beds[5], "non_covid_beds":beds[6], "city":beds[7]}

def insert_patient(name, city, pincode, email, phn_num, password):
    insert_query = "INSERT INTO `patient` (`Name`, `City`, `Pincode`, `Email`, `Phone_Number`, `Password`) VALUES (%s, %s, %s, %s, %s, %s);"
    values = (name, city, pincode, email, phn_num, password)

    my_cursor.execute(insert_query, values)

    mydb.commit()


def insert_admin(hospital_name, admin_name, city, pincode, phn_num, email, password, vaccination, total_beds, covid_beds, non_covid_beds, testing, address):
    insert_query = "INSERT INTO `admin` (`Hospital_Name`, `Admin_Name`, `City`, `Pin`, `Phone_Number`, `Email_Hospital`, `Password`, `Vaccination`, `Total_beds`, `Covid`, `Non_covid`, `Testing`, `Address`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
    values = (hospital_name, admin_name, city, pincode, phn_num, email, password, vaccination, total_beds, covid_beds, non_covid_beds, testing, address)
    
    my_cursor.execute(insert_query, values)

    mydb.commit()
    

def update_beds(covid_beds, non_covid_beds, email):
    update_query = "UPDATE admin SET Covid=(%s), Non_covid=(%s) WHERE Email_Hospital=(%s)"
    values = (covid_beds, non_covid_beds, email)

    my_cursor.execute(update_query, values)

    mydb.commit()

if __name__ == '__main__':
    app.run(debug=True)
