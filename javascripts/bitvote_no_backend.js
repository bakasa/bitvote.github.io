// 'Middle end' between the backend and front end.
// Basically, the thing that talks to Ethereum, or in the PoC versions,
// whatever we use there.

// NOTE: really inconvenient without good state-of-blockchain tracking.

// Current idea is that there is a 'moving time' which starts at the current
// time, and moves forward by the amount voted. However, it may never pass it.

// Pretends to get the current time the forward-moving timer is at.
// (something like eth.getStorageAt(vote_address, own_address))
var var_from_time = 0; //
function from_time()
{   return var_from_time; }

var participated = {};

//Pretends that a transactions, moving the vote-time forward by the amount sent.
function pretend_transact(vote_for, amount)
{  //Lol @ javascript dumb.
    participated[vote_for] = {'amount':amount, 'passed':false};
    var_from_time = from_time()/1 + amount/1;
}

//Pretends to actually spends the vote-time.
function do_spend_time(vote_for, amount)
{   
    if(amount < power_available())  // Have enough.
    {
        pretend_transact(vote_for, amount);
        update_progress();
    }
}

var bitvote_address = "TODO"; // bitvotes address to contact.
//secretToAddress(_a):
var own_address = "TODO";   //Own address.

function power_available()  // Amount of time available to spend.
{   return Math.floor(date.getTime()/1000 - from_time()); }

var var_registered = 0;
function registered()
{   return var_registered; }

function power_spent()
{   return from_time()/1 - registered()/1; }
