import { cache } from "react";
import axios from "../../utils/axiosInstance";
import { serverIpAddressv4 } from "./urls"
const baseURl =  serverIpAddressv4

function srlogin() {
    return new Promise(async (resolve, reject) => {
      let resData = {
        status: false,
        mainToken: {},
        message: "Fail!!",
      };
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      var srlogindata = JSON.stringify({
        "email": "sarin.jaiswal@nctenterprises.in",
        "password": "Sarinjazz45@"
      });
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      try {
        var config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
          headers: {
            'Content-Type': 'application/json'
          },
          data: srlogindata
        };
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //CALL
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        axios(config)
          .then(function(response) {
            resData.status = true;
            resData.message = 'Success!!';
            resData.mainToken = response.data.token;
            resolve(resData);
          }).catch(function(error) {
            console.error(error);
            reject(resData);
          });
      } catch (e) {
        console.error(e);
        reject(resData);
      }
    });
}

function srShippingRateCalculation(pickup_postcode, delivery_postcode, weight, declared_value) {
    return new Promise(async (resolve, reject) => {
      let resData = {
        status: false,
        mainToken: {},
        message: "Fail!!",
      };
      try {
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let getToken = await srlogin();
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let parmers = 'pickup_postcode=' + pickup_postcode;
        parmers += '&delivery_postcode=' + delivery_postcode;
        parmers += '&weight=' + weight;
        parmers += '&cod=1';
        parmers += '&declared_value=' + declared_value;
        parmers += '&rate_calculator=1';
        parmers += '&blocked=1';
        parmers += '&is_return=0';
        parmers += '&is_web=1';
        parmers += '&is_dg=0';
        parmers += '&only_qc_couriers=0';
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        if (getToken.status) {
          var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://apiv2.shiprocket.in/v1/external/courier/serviceability?' + parmers,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken.mainToken}`
            }
          };
          axios(config).then(function(response) {
            resData.status = true;
            resData.message = 'Success!!';
            resData.mainset = response.data;
            resolve(resData);
          }).catch(function(error) {
            //++++++++++++++++++++++++++++++++++++
            console.log(error);
            console.log('srShippingRateCalculation');
            //++++++++++++++++++++++++++++++++++++
            resData.status = false;
            resData.message = 'Error!!';
            resData.mainset = JSON.stringify(error);
            reject(resData);
          });
        } else {
          //+++++++++++++++++++++++++++++++++++++++++
          console.log('srShippingRateCalculation');
          //+++++++++++++++++++++++++++++++++++++++++
          resData.status = false;
          resData.message = 'Error!!';
          reject(resData);
        }
      } catch (e) {
        //+++++++++++++++++++++++++++++++++++++++++
        console.error(e);
        console.log('srShippingRateCalculation');
        //+++++++++++++++++++++++++++++++++++++++++
        reject(resData);
      }
    });
}


const getShippingRates = cache(async (zipcode) => {
  try {
  let response = await srShippingRateCalculation(zipcode, 700053, 2,300);
    if (response.message === "Success!!") {
      return response.mainset.data.available_courier_companies[0]
    } else {
      return {
        courier_name: "India Post - Business Parcel Surface",
        estimated_delivery_date: "7",
        rate: 100,
        rating: 4.5
      };
    }
} catch (error) {
    console.log({error})
  return {
    courier_name: "India Post - Business Parcel Surface",
    estimated_delivery_date: "7",
    rate: 100,
    rating: 4.5
  };
}
})


export default {
    getShippingRates,
};