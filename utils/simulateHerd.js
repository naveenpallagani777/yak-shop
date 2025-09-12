class SimulateHerd {
    constructor(herd) {
        this.herd = herd;
    }

    simulate(days) {
        return this.herd.map(animal => {
            let ageInDays = animal.ageInDays;
            let milk = 0;
            let skins = 0;
            let lastShavedDay = null;

            for (let day = 0; day < days; day++) {
                if (ageInDays >= 1000) break;

                // Milk
                if (animal.gender.toLowerCase() === 'female') {
                    milk += Math.max(0, 50 - ageInDays * 0.03);
                }

                // Shave
                if (day === 0 && ageInDays >= 100) {
                    skins++;
                    lastShavedDay = day;
                } else if (
                    ageInDays >= 100 &&
                    day >= lastShavedDay + (8 + ageInDays * 0.01)
                ) {
                    skins++;
                    lastShavedDay = day;
                }

                ageInDays++;
            }

            return {
                name: animal.name,
                _id: animal._id,
                ageInDays,
                milk,
                skins,
                alive: ageInDays < 1000,
                ageLastShaved: lastShavedDay !== null
                    ? (ageInDays - (days - lastShavedDay)) / 100
                    : null
            };
        });
    }

    getStock(days) {
        const simulated = this.simulate(days);
        const milk = simulated.reduce((sum, yak) => sum + yak.milk, 0);
        const skins = simulated.reduce((sum, yak) => sum + yak.skins, 0);
        return {
            milk: +milk.toFixed(2),
            skins
        };
    }

    getHerd(days) {
        const simulated = this.simulate(days);
        return {
            herd: simulated
                .filter(yak => yak.alive)
                .map(yak => ({
                    name: yak.name,
                    age: +(yak.ageInDays / 100).toFixed(2),
                    'age-last-shaved': yak.ageLastShaved !== null
                        ? +yak.ageLastShaved.toFixed(2)
                        : null
                }))
        };
    }
}

module.exports = SimulateHerd;
