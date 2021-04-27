//Contact route
const express = require('express');
const router = express.Router();

//@route            GET api/contacts
//@description      Get all of the user's contact
//@access           Private

router.get('/', (req, res) => {
    res.send('Get all contacts');
});

//@route            POST api/contacts
//@description      Add new contact
//@access           Private

router.post('/', (req, res) => {
    res.send('Add contact');
});

//@route            PUT api/contacts/:id
//@description      Get all of the user's contact
//@access           Private

router.put('/:id', (req, res) => {
    res.send('Update contact');
});

//@route            DELETE api/contacts
//@description      Delete contact
//@access           Private

router.delete('/:id', (req, res) => {
    res.send('Delete Contact');
});

module.exports = router;