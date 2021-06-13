import '../../App.css';
import Hero from "../Hero.js";
import '../Profile.css';
import { useState, useContext, useEffect } from 'react';
import React from 'react';
import fire from '../../service/fire'
const Profile = () => {


    var user = fire.auth().currentUser.uid;
    const userdata = fire.firestore().collection('users').doc(user).get();



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

    useEffect(() => {
        fetchUser();
        fetchPets();
    }, [])
    const [userData, setUserData] = useState([]);
    const [selectedSection, setSelectedSection] = useState(0);
    const [selectedSide, setSelectedSide] = useState(0);
    const buttonStyles = ['buttonactive', 'buttondisabled'];
    const userAreaStyles = ['userinfoactive', 'userinfodisabled'];
    const profileSettings = ['User', 'Password'];
    const [Pets, setPets] = useState([]);
    const [petIds, setPetIds] = useState([]);

    var profileItems = [];
    var petItems = [];
    var houseItems = [];
    var vehicleItems = [];


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
                <button className={selectedSection == 0 ? buttonStyles[0] : buttonStyles[1]} onClick={() => { setSelectedSection(0) }}>

                    <i class="fas fa-user fa-3x"></i>
            
                </button>

                <button className={selectedSection == 1 ? buttonStyles[0] : buttonStyles[1]} onClick={() => { setSelectedSection(1) }}>

                    <i class="fas fa-paw fa-3x"></i>
                </button>

                <button className={selectedSection == 2 ? buttonStyles[0] : buttonStyles[1]} onClick={() => { setSelectedSection(2) }}>

                    <i class="fas fa-home fa-3x"></i>
                </button>

                <button className={selectedSection == 3 ? buttonStyles[0] : buttonStyles[1]} onClick={() => { setSelectedSection(3) }}>


                    <i class="fas fa-car fa-3x"></i>
                </button>

            </div>

            <div className="sidearea">

                {(() => {
                    if (selectedSection == 0) {
                        return (
                            profileItems.map((item, index) => <button className={selectedSide == index ? userAreaStyles[0] : userAreaStyles[1]} onClick={() => { setSelectedSide(index); console.log(i) }}>
                                {item}</button>)
                        )

                    } else if (selectedSection == 1) {

                        return (

                            Pets.map((item) => <div className="userinfodisabled">{item.name}</div>)
                        )

                    }
                    else if (selectedSection == 2) {

                        return (
                            houseItems.map((item) => <div>{item}</div>)
                        )

                    } else {
                        return (
                            vehicleItems.map((item) => <div>{item}</div>)
                        )
                    }
                })()}

            </div>




            <div className="user">
                {(() => {
                    if (selectedSection == 0) {
                        if (selectedSide == 0) {
                            return (
                                <>

                                    <div className="profilepicture">

                                        <img src={userData.profilePicture} alt="test" />

                                    </div>

                                    <div className="details">

                                        <div className="titles">



                                            <h1 className="name">Name :</h1>

                                            <h1 className="surname">Surname :</h1>

                                            <h1 className="email">Email :</h1>

                                            <h1 className="city">City :</h1>
                                        </div>



                                        <div className="detailsUser">


                                            <h1 className="name">Emre</h1>

                                            <h1 className="surname">Bayrak</h1>

                                            <h1 className="email">Email</h1>

                                            <h1 className="city">City</h1>
                                        </div>
                                    </div>

                                </>
                            )

                        } else if (selectedSide == 1) {

                            return (

                               <div className="div"></div>
                            )

                        }
                    }

                })()}




            </div>
        </div>

    );
}

export default Profile;