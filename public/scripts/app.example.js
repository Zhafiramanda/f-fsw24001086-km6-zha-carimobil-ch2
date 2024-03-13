class App {
    constructor() {
        this.loadButton = document.getElementById("load-btn");
        this.carContainer = document.getElementById("cars-container");
        this.driverType = document.getElementById("driverType");
        this.date = document.getElementById("date");
        this.pickupTime = document.getElementById("pickup_time");
        this.passengerCount = document.getElementById("passenger_count");

        // event listener untuk input tipe driver, waktu sewa, dan jumlah penumpang
        this.driverType.addEventListener('change', this.filterByDriverType);
        this.date.addEventListener('change', this.filterByRentDate);
        this.passengerCount.addEventListener('change', this.filterByPassengerCount);
    }
  
    async init() {
        await this.load();
        this.run();
    }
  
    run = () => {
        this.clear();
        
        Car.list.forEach((car) => {
            const node = document.createElement("div");
            node.classList.add("col-lg-4", "my-3");
            node.innerHTML = car.render();
            this.carContainer.appendChild(node);
        });
    };
  
    async load() {
        const cars = await Binar.listCars();
        Car.init(cars);
        console.log(cars);
    }
  
    clear = () => {
        let child = this.carContainer.firstElementChild;
  
        while (child) {
            child.remove();
            child = this.carContainer.firstElementChild;
        }
    };

    // Fungsi untuk memfilter mobil berdasarkan tipe driver
    filterByDriverType = () => {
        const selectedDriverType = this.driverType.value;
        this.runFilteredCars(null, null, selectedDriverType);
    };

    // Fungsi untuk memfilter mobil berdasarkan waktu sewa
    filterByRentDate = () => {
        const rentDate = new Date(this.date.value);
        this.runFilteredCars(rentDate);
    };

    // Fungsi untuk memfilter mobil berdasarkan jumlah penumpang
    filterByPassengerCount = () => {
        const passengerCount = parseInt(this.passengerCount.value);
        this.runFilteredCars(null, passengerCount);
    };

    // Fungsi untuk menjalankan filter mobil berdasarkan waktu sewa, jumlah penumpang, dan/atau tipe driver
    runFilteredCars = (rentDate = null, passengerCount = null, driverType = null) => {
        this.clear();
        
        Car.list.forEach((car) => {
            if ((!rentDate || new Date(car.availableDate) >= rentDate) &&
                (!passengerCount || car.capacity >= passengerCount) &&
                (!driverType || car.driverType === driverType)) {
                const node = document.createElement("div");
                node.classList.add("col-lg-4", "my-3");
                node.innerHTML = car.render();
                this.carContainer.appendChild(node);
            }
        });
    };
}
