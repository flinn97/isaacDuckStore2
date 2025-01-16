const Duck = require('../models/duckModel');

exports.getAllDucks = async (req, res) => {
    try {
        const ducks = await Duck.find({ deleted: false}).sort({quantity : 1});
        res.json(ducks);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

exports.createOrUpdateDuck = async (req, res) => {

    try {
        const {color, size, price, quantity} = req.body;

        let duck = await Duck.findOne({ color, size, price, deleted: false});
        if (duck) {
            duck.quantity += quantity;
            await duck.save();
            return res.json(duck)
        }else{
            let newDuck = new Duck({ color, size, price, quantity});
            await newDuck.save();
            return res.json(newDuck);
        }
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

exports.deleteDuck = async (req, res) => {
    
    try {
        const {id} = req.params;
        let duck = await Duck.findById(id);
        if (!duck || duck.deleted) return res.status(404).json({ error: 'That duck was not found'});

        duck.deleted = true;
        await duck.save();
        res.json({message: 'Duck deleted.'})
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};


exports.editDuck = async (req, res) => {
    try {
      const { id } = req.params;
      const { price, quantity } = req.body;
  
      let duck = await Duck.findById(id);
      if (!duck || duck.deleted) return res.status(404).json({ error: 'That duck was not found' });
  
      duck.price = price;
      duck.quantity = quantity;
      await duck.save();
      res.json(duck);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
