var res = false;

function validate(email){
    var re = /\S+@\S+\.\S+/;
        res = re.test(email)
        return re.test(email);
}
export { validate, res }