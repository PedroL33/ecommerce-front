import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress
} from 'react-places-autocomplete';
import { useDispatch } from 'react-redux';
import styles from '../../styles/contactForm.module.css';
import { setContact } from '../../actions';

function ContactForm(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [st, setSt] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({});

  function handleSelect(address) {
    geocodeByAddress(address)
      .then(results => {
        const components = results[0].formatted_address.split(',');
        setStreet(components[0]);
        setCity(components[1]);
        setSt(components[2].split(" ")[1]);
        setZip(components[2].split(" ")[2]);
        setCountry(components[3]);
      })
  };

  useEffect(() => {
    const storedInfo = localStorage.getItem('contact')
    if(storedInfo) {
      const contactInfo = JSON.parse(storedInfo);
      if(contactInfo) {
        setEmail(contactInfo.email)
        const addressInfo = contactInfo.address.split(',')
        setStreet(addressInfo[0].trim())
        setCity(addressInfo[1].trim())
        setSt(addressInfo[2].trim())
        setZip(addressInfo[4].trim())
        setCountry(addressInfo[3].trim())
      }
    }
  }, [])

  function validateEmail (email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  function handleSubmit() {
    const newErrors = {}
    street.length ? delete newErrors.street : newErrors.street = "Enter a street.";
    st.length ? delete newErrors.st : newErrors.st = "Enter a state.";
    zip.length ? delete newErrors.zip : newErrors.zip = "Enter a zip.";
    city.length ? delete newErrors.city : newErrors.city = "Enter a city.";
    country.length ? delete newErrors.country : newErrors.country = "Enter a country.";
    email.length && validateEmail(email) ? delete newErrors.email : newErrors.email = "Enter a valid email.";
    if(Object.keys(newErrors).length > 0) {
      setErrors({...newErrors})
    }else {
      const data = {email: email, address: street+', '+city+', '+st+', '+country+', '+zip}
      dispatch(setContact(data))
      localStorage.setItem("contact", JSON.stringify(data))
      props.setStep(2)
    } 
  }

  return (
    <div className={styles.contactContainer}>
      <label className={styles.formLabel}>
        Contact Information: 
      </label>
      <div className={styles.formInputContainer}>
        <input className={errors.email && !validateEmail(email) && styles.formError} value={email} type="text" placeholder="email" onChange={(e)=> setEmail(e.target.value)}></input>
        {errors.email && !validateEmail(email) && <span className={styles.errorNotif}>{errors.email}</span>}
      </div> 
      <label className={styles.formLabel}>
        Shipping Address: 
      </label>
      <PlacesAutocomplete
        value={street}
        onChange={(x) => setStreet(x)}
        onSelect={handleSelect}
        searchOptions={{componentRestrictions: {country: 'us'}}}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={styles.formInputContainer}>
            <input className={errors.street && street.length && styles.formError}
              {...getInputProps({
                placeholder: 'Street'
              })}
            />
            <div className={styles.autocompleteDropdownContainer}>
              {loading && <div className={styles.suggestionItem}>Loading...</div>}
              {suggestions.filter(item => (item.types.includes('premise') || item.types.includes('street_address'))).map((suggestion, index) => {
                const className = styles.suggestionItem;
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className
                    })}
                    key={index}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            {errors.street && <span className={styles.errorNotif}>{errors.street}</span>}
          </div>
        )}
      </PlacesAutocomplete>
      <div className={styles.formInputContainer}>
        <input type="text" placeholder="Apt. Suite ect..."></input>
      </div>
      <div className={styles.formInputContainer}>
        <input className={errors.city && !city.length && styles.formError} type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City"></input>
        {errors.city && <span className={styles.errorNotif}>{errors.city}</span>}
      </div>
      <div className={styles.addressRow}>
        <div className={styles.formInputContainer}>
          <input className={errors.st && !st.length && styles.formError} type="text" placeholder="State" value={st} onChange={(e) => setSt(e.target.value)}></input>
          {errors.st && <span className={styles.errorNotif}>{errors.st}</span>}
        </div>
        <div className={styles.formInputContainer}>
          <input className={errors.country && !country.length && styles.formError} type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)}></input>
          {errors.country && <span className={styles.errorNotif}>{errors.country}</span>}
        </div>
        <div className={styles.formInputContainer}>
          <input className={errors.zip && !zip.length && styles.formError} type="text" placeholder="Zipcode" value={zip} onChange={(e) => setZip(e.target.value)}></input>
          {errors.zip && <span className={styles.errorNotif}>{errors.zip}</span>}
        </div>
      </div>
      <button className={styles.submitButton} onClick={()=> handleSubmit()}>Continue to Shipping</button>
    </div>
  )
}

export default ContactForm;