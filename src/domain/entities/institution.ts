export class InstitutionImpl {
  name: string;
  address: string;
  country: string;
  region: string;
  id: string;

  constructor({ name, address, country, region, id }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.country = country;
    this.region = region;
  }

  toJSON() {
    return {
      name: this.name,
      address: this.address,
      country: this.country,
      region: this.region,
      id: this.id,
    };
  }
}

export default interface Institution {
  name: string;
  address: string;
  country: string;
  region: string;
  id: string;
  toJSON(): Object;
}
