const { StatusCodes } = require('http-status-codes');
const {Op}=require('sequelize');
const {    FlightRepository } = require('../repositories');
// const {DateTimeHelper}=require('../utils/helpers');
const AppError = require('../utils/errors/app-error');


const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
       
        const flight = await flightRepository.create(data);
        return flight;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter={};
    let sortFilter={};
    //trips=MUM-DEL
    // console.log(query.trips);
   const endingTripTime="23:59:00";
    if(query.trips){
        [departureAirportId,arrivalAirportId]=query.trips.split("-");
        customFilter.departureAirportId=departureAirportId;
        customFilter.arrivalAirportId=arrivalAirportId;
        //TODO: add a check that they are not same


    }
    if(query.price){
        [minPrice,maxPrice]=query.price.split("-");
        customFilter.price={
            [Op.between]:[minPrice,((maxPrice==undefined)?2000:maxPrice)]
        }
    }

    if(query.travellers){
        customFilter.totalSeats={
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
        customFilter.departureTime ={
            [Op.gte]: [query.tripDate,query.tripDate+endingTripTime]
        } 
    }

    if(query.sort){
        const params=query.sort.split(',');
        const sortFilters=params.map((param)=>param.split('_'));
        sortFilter=sortFilters;
    }
    
    // console.log(customFilter);
    try{
        const flights=await flightRepository.getAllFlights(customFilter);
       
        return flights;

    }catch(error){
        // console.log(flights);
        throw new AppError('Cannot fetch the data of all the flights',StatusCodes.INTERNAL_SERVER_ERROR);

    }
  
}


module.exports = {
    createFlight,
    getAllFlights
  
}