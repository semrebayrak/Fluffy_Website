import '../../App.css';
import Hero from "../Hero.js";
import '../Profile.css';
import { useState, useContext, useEffect } from 'react';
import React from 'react';
import fire from '../../service/fire'
const Profile = () => {


    var user = fire.auth().currentUser.uid;
    const userdata = fire.firestore().collection('users').doc(user).get();
    const [errorMessage, setErrorMessage] = useState();
    function writeUserData(name, surname, email, city) {

        fire.firestore().collection('users').doc(user).update({
            name: name,
            email: email,
            city: city,
            surname: surname
        });
        setEdit(0);
        fire.auth().currentUser.updateEmail(email).then((result) => {
            alert("Successfully Edited")
            return result;
        })
            .catch(error => {



                alert(error.message);

            });
    }

    function writePetData(id, name, age, sex) {

        fire.firestore().collection('pets').doc(String(id)).update({
            name: name,
            age: age,
            sex: sex,

        }).then((result) => {
            alert("Successfully Edited")
            return result;
        })
            .catch(error => {



                alert(error.message);

            });
        setEdit(0);
        setPetName(name);
        setSex(sex);
        setAge(age);

    }

    function writeHouseData(id, title, city, address) {

        fire.firestore().collection('houses').doc(String(id)).update({
            title: title,
            city: city,
            address: address,

        }).then((result) => {
            alert("Successfully Edited")
            return result;
        })
            .catch(error => {



                alert(error.message);

            });
        setEdit(0);
        setTitle(title);
        setHouseCity(city);
        setAddress(address);

    }
    function writeCarData(id, brand, model, plate) {

        fire.firestore().collection('houses').doc(String(id)).update({
            brand: brand,
            model: model,
            plate: plate,

        }).then((result) => {
            alert("Successfully Edited")
            return result;
        })
            .catch(error => {



                alert(error.message);

            });
        setEdit(0);
        setBrand(brand);
        setModel(model);
        setPlate(plate);

    }


    function changePassword(password) {


        fire.auth().currentUser.updatePassword(password).then((result) => {
            alert("Successfull");
            return result;
        })
            .catch(error => {



                alert(error.message);

            })

    }

    const fetchUser = async () => {
        const item = (await userdata);
        setUserData(item.data());

    }
    const fetchPets = async () => {

        (await userdata).data().pets.forEach(async pet => {

            const data = fire.firestore().collection('pets').doc(String(pet)).get();

            const item = (await data);
           
            setPets(Pets => [...Pets, item.data()]);

        });

    }
    const fetchHouses = async () => {

        (await userdata).data().houses.forEach(async house => {

            const data = fire.firestore().collection('houses').doc(String(house)).get();

            const item = (await data);
            
            setHouses(Houses => [...Houses, item.data()]);

        });

    }
    const fetchCars = async () => {

        (await userdata).data().cars.forEach(async car => {

            const data = fire.firestore().collection('cars').doc(String(car)).get();

            const item = (await data);
            console.log(item.data());
            setCars(Cars => [...Cars, item.data()]);

        });

    }
    useEffect(() => {
        fetchUser();
        fetchPets();
        fetchHouses();
        fetchCars();

      

    }, [])
    const [itemChanged, setItemChanged] = useState(0);
    const [edit, setEdit] = useState(0);
    const [userData, setUserData] = useState([]);
    const [selectedSection, setSelectedSection] = useState(0);
    const [selectedSide, setSelectedSide] = useState();
    const buttonStyles = ['buttonactive', 'buttondisabled'];
    const userAreaStyles = ['userinfoactive', 'userinfodisabled'];
    const profileSettings = ['User', 'Password'];
    const [Pets, setPets] = useState([]);
    const [Houses, setHouses] = useState([]);
    const [Cars, setCars] = useState([]);

    const [password, setPassword] = useState();
    const [petName, setPetName] = useState();
    const [age, setAge] = useState();
    const [sex, setSex] = useState();
    var profileItems = [];


    const [title, setTitle] = useState();
    const [houseCity, setHouseCity] = useState();
    const [address, setAddress] = useState();



    const [brand, setBrand] = useState();
    const [model, setModel] = useState();
    const [plate, setPlate] = useState();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [surname, setSurname] = useState("");

    for (var i = 0; i < profileSettings.length; i++) {
        profileItems.push(<>

            {profileSettings[i]}

        </>);
    }


    return (



        <div className="ProfileArea">

            <div className="icons">

                <div className="blank">

                    Fluffy <br></br>Settings

                </div>
                <button className={selectedSection == 0 ? buttonStyles[0] : buttonStyles[1]} onClick={() => { setSelectedSection(0);setSelectedSide(); }}>

                    <i class="fas fa-user fa-3x"></i>

                </button>

                <button className={selectedSection == 1 ? buttonStyles[0] : buttonStyles[1]} onClick={() => { setSelectedSection(1);setSelectedSide(); }}>

                    <i class="fas fa-paw fa-3x"></i>
                </button>

                <button className={selectedSection == 2 ? buttonStyles[0] : buttonStyles[1]} onClick={() => { setSelectedSection(2);setSelectedSide(); }}>

                    <i class="fas fa-home fa-3x"></i>
                </button>

                <button className={selectedSection == 3 ? buttonStyles[0] : buttonStyles[1]} onClick={() => { setSelectedSection(3);setSelectedSide(); }}>


                    <i class="fas fa-car fa-3x"></i>
                </button>

            </div>

            <div className="sidearea">

                {(() => {
                    if (selectedSection == 0) {
                        return (
                            profileItems.map((item, index) => <button className={selectedSide == index ? userAreaStyles[0] : userAreaStyles[1]} onClick={() => { setCity(item.city); setEmail(item.email); setSurname(item.surname); setName(item.name); setSelectedSide(index); setItemChanged(0); }}>
                                {item}</button>)
                        )

                    } else if (selectedSection == 1) {

                        return (

                            Pets.map((item, index) => <button className={selectedSide == index ? userAreaStyles[0] : userAreaStyles[1]} onClick={() => { setSex(item.sex); setAge(item.age); setPetName(item.name); setSelectedSide(index); setItemChanged(0); }}>
                                {item.name}</button>)
                        )

                    }
                    else if (selectedSection == 2) {

                        return (
                            Houses.map((item, index) => <button className={selectedSide == index ? userAreaStyles[0] : userAreaStyles[1]} onClick={() => { setTitle(item.title); setAddress(item.address); setHouseCity(item.city); setSelectedSide(index); setItemChanged(0); }}>
                                {item.title}</button>)
                        )

                    } else {
                        return (
                            Cars.map((item, index) => <button className={selectedSide == index ? userAreaStyles[0] : userAreaStyles[1]} onClick={() => { setBrand(item.brand); setModel(item.model); setPlate(item.plate); setSelectedSide(index); setItemChanged(0); }}>
                                {item.plate}</button>)
                        )
                    }
                })()}

            </div>




            <div className="user">
                {(() => {
                    if (selectedSection == 0) {
                        if (selectedSide == 0) {
                            if (!edit) {
                                return (
                                    <>

                                        <div className="profilepicture">

                                            <img src={userData.profilePicture} alt="pp" />

                                        </div>

                                        <div className="details">

                                            <div className="titles">



                                                <h1 className="name">Name :</h1>

                                                <h1 className="surname">Surname :</h1>

                                                <h1 className="email">Email :</h1>

                                                <h1 className="city">City :</h1>
                                            </div>



                                            <div className="detailsUser">


                                                <h1 className="name">{userData.name}</h1>

                                                <h1 className="surname">{userData.surname}</h1>

                                                <h1 className="email">{userData.email}</h1>

                                                <h1 className="city">{userData.city}</h1>
                                            </div>

                                            <div className="edit">

                                                <button className="editButton" onClick={() => setEdit(1)}>Edit</button>
                                            </div>


                                        </div>

                                    </>
                                )

                            }
                            else {
                                return (
                                    <>

                                        <div className="profilepicture">

                                            <img src={userData.profilePicture} alt="pp" />

                                        </div>

                                        <div className="details">



                                            <div className="titles">



                                                <h1 className="name">Name :</h1>

                                                <h1 className="surname">Surname :</h1>

                                                <h1 className="email">Email :</h1>

                                                <h1 className="city">City :</h1>
                                            </div>

                                            <div className="editDetailsUser">

                                                <input type="text" value="dada" autoFocus required value={name} onChange={(e) => setName(e.target.value)} />
                                                <input type="text" onFocus={surname} autoFocus required value={surname} onChange={(e) => setSurname(e.target.value)} />

                                                <input type="text" onFocus={email} autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />

                                                <input type="text" onFocus={city} autoFocus required value={city} onChange={(e) => setCity(e.target.value)} />



                                            </div>
                                            <button className="cancelEdit" onClick={() => setEdit(0)}>
                                                <i class="fas fa-window-close"></i>
                                            </button>
                                            <div className="edit">

                                                <button className="editButton" onClick={() => [writeUserData(name, surname, email, city)]}>Send</button>
                                            </div>


                                        </div>

                                    </>
                                )
                            }
                        } else if (selectedSide == 1) {

                            return (

                                <div className="passworddetails">


                                    <h1 className="password">Change Password</h1>
                                    <div className="details">
                                        <div className="area">
                                            <input type="text" value="dada" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} /> </div>



                                        <button className="passChangeButton" onClick={() => [changePassword(password)]}>Send</button>
                                        <p className="error"> {errorMessage} </p>
                                    </div>



                                </div>

                            )

                        }
                    }

                    if (selectedSection == 1) {

                        for (var i = 0; i < Pets.length; i++) {

                            if (selectedSide == i) {
                                if (!edit) {

                                    return (
                                        <>

                                            <div className="profilepicture">

                                                <img src={Pets[i].petPic} alt="pp" />

                                            </div>

                                            <div className="details">

                                                <div className="titles">



                                                    <h1 className="name">Name :</h1>

                                                    <h1 className="age">Age :</h1>

                                                    <h1 className="sex">Sex :</h1>


                                                </div>



                                                <div className="detailsUser">


                                                    <h1 className="name">{petName}</h1>

                                                    <h1 className="age">{age}</h1>

                                                    <h1 className="sex">{sex}</h1>


                                                </div>

                                                <div className="edit">

                                                    <button className="editButton" onClick={() => { setEdit(1); }}>Edit</button>
                                                </div>


                                            </div>

                                        </>
                                    )

                                }
                                else {
                                    return (
                                        <>

                                            <div className="profilepicture">

                                                <img src={Pets[i].petPic} alt="pp" />

                                            </div>

                                            <div className="details">



                                                <div className="titles">



                                                    <h1 className="name">Name :</h1>

                                                    <h1 className="age">Age :</h1>

                                                    <h1 className="sex">Sex :</h1>
                                                </div>

                                                <div className="editDetailsUser">

                                                    <input type="text" onFocus={petName} autoFocus required value={petName} onChange={(e) => setPetName(e.target.value)} />
                                                    <input type="text" onFocus={age} autoFocus required value={age} onChange={(e) => setAge(e.target.value)} />

                                                    <input type="text" onFocus={sex} autoFocus required value={sex} onChange={(e) => setSex(e.target.value)} />





                                                </div>
                                                <button className="cancelEdit" onClick={() => setEdit(0)}>
                                                    <i class="fas fa-window-close"></i>
                                                </button>
                                                <div className="edit">

                                                    <button className="editButton" onClick={() => { writePetData(Pets[i].id, petName, age, sex); setItemChanged(1); }}>Send</button>
                                                </div>


                                            </div>

                                        </>
                                    )
                                }
                            }

                        }

                    }
                    if (selectedSection == 2) {

                        for (var i = 0; i < Houses.length; i++) {

                            if (selectedSide == i) {
                                if (!edit) {

                                    return (
                                        <>

                                            <div className="profilepicture">

                                                <img src={Houses[i].coverimage} alt="pp" />

                                            </div>

                                            <div className="details">

                                                <div className="titles">



                                                    <h1 className="title">Title :</h1>

                                                    <h1 className="city">City :</h1>

                                                    <h1 className="address">Address :</h1>


                                                </div>



                                                <div className="detailsUser">


                                                    <h1 className="title">{title}</h1>

                                                    <h1 className="city">{houseCity}</h1>

                                                    <h1 className="address">{address}</h1>


                                                </div>

                                                <div className="edit">

                                                    <button className="editButton" onClick={() => { setEdit(1); }}>Edit</button>
                                                </div>


                                            </div>

                                        </>
                                    )

                                }
                                else {
                                    return (
                                        <>

                                            <div className="profilepicture">

                                                <img src={Houses[i].coverimage} alt="pp" />

                                            </div>

                                            <div className="details">



                                                <div className="titles">



                                                    <h1 className="title">Title :</h1>

                                                    <h1 className="city">City :</h1>

                                                    <h1 className="address">Address :</h1>
                                                </div>

                                                <div className="editDetailsUser">

                                                    <input type="text" onFocus={title} autoFocus required value={title} onChange={(e) => setTitle(e.target.value)} />
                                                    <input type="text" onFocus={houseCity} autoFocus required value={houseCity} onChange={(e) => setHouseCity(e.target.value)} />

                                                    <input type="text" onFocus={address} autoFocus required value={address} onChange={(e) => setAddress(e.target.value)} />





                                                </div>
                                                <button className="cancelEdit" onClick={() => setEdit(0)}>
                                                    <i class="fas fa-window-close"></i>
                                                </button>
                                                <div className="edit">

                                                    <button className="editButton" onClick={() => { writeHouseData(Houses[i].id, title, houseCity, address); setItemChanged(1); }}>Send</button>
                                                </div>


                                            </div>

                                        </>
                                    )
                                }
                            }

                        }

                    }
                    if (selectedSection == 3) {

                        for (var i = 0; i < Cars.length; i++) {

                            if (selectedSide == i) {
                                if (!edit) {

                                    return (
                                        <>

                                            <div className="profilepicture">

                                                <img src={Cars[i].coverimage} alt="pp" />

                                            </div>

                                            <div className="details">

                                                <div className="titles">



                                                    <h1 className="brand">Brand :</h1>

                                                    <h1 className="model">Model :</h1>

                                                    <h1 className="plate">Plate :</h1>


                                                </div>



                                                <div className="detailsUser">


                                                    <h1 className="brand">{brand}</h1>

                                                    <h1 className="model">{model}</h1>

                                                    <h1 className="plate">{plate}</h1>


                                                </div>

                                                <div className="edit">

                                                    <button className="editButton" onClick={() => { setEdit(1); }}>Edit</button>
                                                </div>


                                            </div>

                                        </>
                                    )

                                }
                                else {

                                    return (
                                        <>

                                            <div className="profilepicture">

                                                <img src={Cars[i].coverimage} alt="pp" />

                                            </div>

                                            <div className="details">



                                                <div className="titles">


                                                    <h1 className="brand">Brand :</h1>

                                                    <h1 className="model">Model :</h1>

                                                    <h1 className="plate">Plate :</h1>

                                                </div>

                                                <div className="editDetailsUser">

                                                    <input type="text" onFocus={brand} autoFocus required value={brand} onChange={(e) => setBrand(e.target.value)} />
                                                    <input type="text" onFocus={model} autoFocus required value={model} onChange={(e) => setModel(e.target.value)} />

                                                    <input type="text" onFocus={plate} autoFocus required value={plate} onChange={(e) => setPlate(e.target.value)} />





                                                </div>
                                                <button className="cancelEdit" onClick={() => setEdit(0)}>
                                                    <i class="fas fa-window-close"></i>
                                                </button>
                                                <div className="edit">

                                                    <button className="editButton" onClick={() => { writeCarData(Cars[i].id, brand, model, plate); setItemChanged(1); }}>Send</button>
                                                </div>


                                            </div>

                                        </>
                                    )
                                }
                            }

                        }

                    }
                })()}




            </div>
        </div>

    );
}

export default Profile;
