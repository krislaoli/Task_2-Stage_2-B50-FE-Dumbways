import React from 'react';
import "./assets/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

interface LocationFormState {
  provinces: any[];
  regencies: any[];
  districts: any[];
  villages: any[];
  selectedProvince: string;
  selectedRegency: string;
  selectedDistrict: string;
  selectedVillage: string;
}

class LocationForm extends React.Component<{}, LocationFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      provinces: [],
      regencies: [],
      districts: [],
      villages: [],
      selectedProvince: '',
      selectedRegency: '',
      selectedDistrict: '',
      selectedVillage: ''
    };
  }

  componentDidMount() {
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(response => response.json())
      .then(data => this.setState({ provinces: data }));
  }

  handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = event.target.value;
    this.setState({ selectedProvince: provinceId });

    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
      .then(response => response.json())
      .then(data => this.setState({ regencies: data, selectedRegency: '', districts: [], selectedDistrict: '', villages: [], selectedVillage: '' }));
  }

  handleRegencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const regencyId = event.target.value;
    this.setState({ selectedRegency: regencyId });

    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`)
      .then(response => response.json())
      .then(data => this.setState({ districts: data, selectedDistrict: '', villages: [], selectedVillage: '' }));
  }

  handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = event.target.value;
    this.setState({ selectedDistrict: districtId });

    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`)
      .then(response => response.json())
      .then(data => this.setState({ villages: data, selectedVillage: '' }));
  }

  handleVillageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const villageId = event.target.value;
    this.setState({ selectedVillage: villageId });
  }

  render() {
    const { provinces, regencies, districts, villages } = this.state;

    return (
      <div className='class-indonesia container w-50 shadow-sm  rounded' style={{ backgroundColor: '#f0f0f0' }}>
        <form action="">
          <h2 style={{ textAlign: 'center' }}>Indonesian Location Data</h2>
        <div className='mx-auto' style={{ backgroundColor: '#f0f0f0' }}>
          <p className='mb-2 fw-bold'>Province</p>
          <select className='w-100 form-select mb-3' onChange={this.handleProvinceChange} value={this.state.selectedProvince}>
            <option value="">Select Province</option>
            {provinces.map(province => (
              <option key={province.id} value={province.id}>{province.name}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2 fw-bold'>Regency</p>
          <select className='w-100 form-select mb-3' onChange={this.handleRegencyChange} value={this.state.selectedRegency}>
            <option value="">Select Regency</option>
            {regencies.map(regency => (
              <option key={regency.id} value={regency.id}>{regency.name}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2 fw-bold'>District</p>
          <select className='w-100 form-select mb-3' onChange={this.handleDistrictChange} value={this.state.selectedDistrict}>
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.id} value={district.id}>{district.name}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2 fw-bold'>Village</p>
          <select className='w-100 form-select mb-3' onChange={this.handleVillageChange} value={this.state.selectedVillage}>
            <option value="">Select Village</option>
            {villages.map(village => (
              <option key={village.id} value={village.id}>{village.name}</option>
            ))}
          </select>
        </div>
        </form>
      </div>
    );
  }
}

export default LocationForm;
