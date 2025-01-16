

// B
// Implement the following requirement using one or more design patterns and applying good
// programming practices. Depending on the size and shipping mode, decide how the ducks will be
// packaged.


function getPackageType(size) {
    switch (size) {
        case 'XLarge':
        case 'Large':
            return 'wood';
        case 'Medium':
            return 'cardboard';
        case 'Small':
        case 'XSmall':
            return 'plastic';
        default:
            return 'unknown';
    }
};

function getProtection(packageType, shippingMode) {
    const protections = []; //more than 1 protection

    if (shippingMode === 'air') {
        if (packageType === 'wood' || packageType === 'cardboard') {
            protections.push('polystyrene balls');
        } else if (packageType === 'plastic') {
            protections.push('bubble wrap bags');
        }
    }
    else if (shippingMode === 'land') {

        protections.push('polystyrene balls');
    }
    else if (shippingMode === 'sea') {
        protections.push('moisture-absorbing beads');
        protections.push('bubble wrap bags');
    }

    return protections;
};


function calculateCost({
    basePrice,
    quantity,
    packageType,
    destination,
    shippingMode
}) {
    //i. The total cost is calculated as quantity * price.
    let total = basePrice * quantity;
    const detail = [];
    const discount = 0;
    const surcharge = 0;

    // ii. If the order is greater than 100 units, apply a 20% discount to the total cost.
    if (quantity > 100) {
        discount = total * 0.2;
        total -= discount;
        detail.push(`-20% discount for large order: -$${discount.toFixed(2)}`)
    }

    // iii. If the package is made of wood, add 5% of the total cost.
    // iv. If the package is made of plastic, add 10% of the total cost.
    // v. If the package is made of cardboard, apply a 1% discount to the total cost.
    if (packageType === 'wood') {
        surcharge = total * 0.05;
        total += surcharge;
        detail.push(`+5% for wood packaging: +$${surcharge.toFixed(2)}`);
    } else if (packageType === 'plastic') {
        surcharge = total * 0.10;
        total += surcharge;
        detail.push(`+10% for plastic packaging: +$${surcharge.toFixed(2)}`);
    } else if (packageType === 'cardboard') {
        cardboardDiscount = total * 0.01;
        total -= cardboardDiscount;
        detail.push(`-1% for cardboard packaging: -$${cardboardDiscount.toFixed(2)}`);
    }

    // vi. If the destination country is the USA, add 18% of the total cost.
    // vii. If the destination country is Bolivia, add 13% of the total cost.
    // viii. If the destination country is India, add 19% of the total cost.

    let countryCharge = 0.15; // ix. For any other country, add 15% of the total cost.
    switch (destination.toLowerCase()) {
        case 'usa':
            countryCharge = 0.18;
            break;
        case 'bolivia':
            countryCharge = 0.13;
            break;
        case 'india':
            countryCharge = 0.19;
            break;
        default:
            countryCharge = 0.15;
    }
    const countryCost = total * countryCharge;
    total += countryCost;
    detail.push(`+${(countryCharge * 100).toFixed(0)}% for shipping to ${destination}: +$${countryCost.toFixed(2)}`);



    // x. If the shipment is by sea, add 400 US dollars.
    // xi. If the shipment is by land, add 10 US dollars per order quantity.
    // xii. If the shipment is by air, add 30 US dollars per order quantity minus 15% if the order exceeds 1000 units.
    if (shippingMode === 'sea') {
        total += 400;
        detail.push(`+$400 for sea shipping`);
    }
    else if (shippingMode === 'land') {
        const landCost = 10 * quantity;
        total += landCost;
        detail.push(`+$10 x ${quantity} for land shipping: +$${landCost}`);
    }
    else if (shippingMode === 'air') {
        let airCost = 30 * quantity;

        if (quantity > 1000) {
            const discount = airCost * 0.15;
            airCost -= discount;
            detail.push(`-15% discount on air shipping cost because order > 1000: -$${discount.toFixed(2)}`);
        }
        total += airCost;
        detail.push(`+$${(30).toFixed(2)} x ${quantity} for air shipping => +$${airCost.toFixed(2)}`);
    }

    return {
        total: +total.toFixed(2),
        detail
    };


};


exports.createOrder = async (req, res) => {
    try {
        const { color, size, quantity, destination, shippingMode } = req.body;
        const basePrice = req.body.price || 10;

        const packageType = getPackageType(size);
        const protection = getProtection(packageType, shippingMode);
        const { total, detail } = calculateCost({
            basePrice,
            quantity,
            packageType,
            destination,
            shippingMode
          });

          res.json({
            packageType,
            protection,
            totalToPay: total,
            breakdown: detail
          });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
};