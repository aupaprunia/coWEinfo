

def insert_patient(name, city, pincode, email, phn_num, password):
    insert_query = "INSERT INTO `patient` (`Name`, `City`, `Pin`, `Email_Hospital`, `Phone_Number`, `Password`) VALUES (%s, %s, %d, %s, %s, %s);"
    values = (name, city, pincode, email, phn_num, password)

    my_cursor.execute(insert_query, values)

    mydb.commit()


def insert_admin(hospital_name, admin_name, city, pincode, phn_num, email, password, vaccination, total_beds, covid_beds, non_covid_beds, testing):
    insert_query = "INSERT INTO `admin` (`Hospital_Name`, `Admin_Name`, `City`, `Pin`, `Phone Number`, `Email ID_Hospital`, `Password`, `Vaccination`, `Total_beds`, `Covid`, `Non_covid`, `Testing`) VALUES (%s, %s, %s, %d, %s, %s, %s, %s, %d, %d, %d, %s);"
    values = (hospital_name, admin_name, city, pincode, phn_num, email, password, vaccination, total_beds, covid_beds, non_covid_beds, testing)
    
    my_cursor.execute(insert_query, values)

    mydb.commit()


def update_beds(covid_beds, non_covid_beds, city):
    update_query = "UPDATE admin SET Covid=(%d), Non_covid=(%d) WHERE City=(%s)"
    values = (covid_beds, non_covid_beds, city)

    my_cursor.execute(update_query, values)

    mydb.commit()

