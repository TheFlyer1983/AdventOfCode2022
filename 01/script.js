const fs = require('fs');

function dayOne() { 
  fs.readFile('./input.txt', (err, data) => {
    if (err) {
      console.log('You have an error. Sorry!');
    }

    const array = data.toString().split('\n\n').map(elf => elf.split('\n'));

    const elfTotals = array.map(elf => {
      return elf.reduce((total, item) => {
        return total = total + Number(item);
      }, 0);
    });

    elfTotals.sort((a, b) => a > b ? -1 : 1);

    console.log(`The Highest total is ${elfTotals[0]} calories`);

    const topThreeTotal = elfTotals.slice(0, 3).reduce((total, item) => total = total + item, 0);

    console.log(`The combined total is ${topThreeTotal} calories`);
  })
};

dayOne();