const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;

    const errors=[];
    
    if (title==null){
        errors.push({field:"title",message:"this fiels is required"});
    } else if(title.length>=255) {
        errors.push({field:"title", message :"Shouldcontain less than 255 characters"});
    }

    if (director==null){
        errors.push({field:"director",message:"this fiels is required"});
    } else if(title.length>=255) {
        errors.push({field:"director", message :"Shouldcontain less than 255 characters"});
    }
const yearRegex=/\b[0-9]{4}\b/;
   if (year==null){
        errors.push({field:"year",message:"this fiels is required"});
    } else if (!yearRegex.test(year)){
        errors.push({field:'year', message:"Invalid Year"});
    }

   if (color==null){
        errors.push({field:"color",message:"this fiels is required"});
    }

const durationRegex=/\b\d{2,3}\b/;
    if (duration==null){
        errors.push({field:"duration",message:"this fiels is required"});
    } else if (!durationRegex.test(duration)){
        errors.push({field:'duration', message:"Invalid duration"});
    }
    if (errors.length){
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }  
  };

const validateUser=(req,res,next) => {
    const {firstname,lastname,email,city,language}=req.body;
    const errors=[];

const emailRegex=/[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

if(firstname==null){
    errors.push({field:"firstname",message:"this fiels is required"});
}
else if (firstname.length>=255){
    errors.push({field:"director", message :"Should contain less than 255 characters"});
}

if(lastname==null){
    errors.push({field:"lastname",message:"this fiels is required"});
}
else if (lastname.length>=255){
    errors.push({field:"lastname", message :"Should contain less than 255 characters"});
}

if(email==null){
    errors.push({field:"email",message:"this fiels is required"});
}
else if (!emailRegex.test(email)){
    errors.push({field:'email', message:'Invalid email'});
}

if(city==null){
    errors.push({field:"city",message:"this fiels is required"});
}
else if (city.length>=255){
    errors.push({field:"city", message :"Should contain less than 255 characters"});
}

if(language==null){
    errors.push({field:"language",message:"this fiels is required"});
}
else if (language.length>=255){
    errors.push({field:"language", message :"Should contain less than 255 characters"});
}

if(errors.length){
    res.status(422).json({validationErrors: errors});
} else {
    next();
}
};

  module.exports = {
    validateMovie,
    validateUser,
  };
  