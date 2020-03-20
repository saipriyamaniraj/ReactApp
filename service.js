const { CpmBasicDetailsModel } = require('../dbStore/schemaModel/cpmDprPasfileDetailsSchema.js');
const { CpmPasFileDetailsModel } = require('../dbStore/schemaModel/cpmPasfileDetailsSchema.js');
const { CpmDprComponetDetailsModel } = require('../dbStore/schemaModel/cpmDprComponentCountSchema.js');
const { CpmPasComponetDetailsModel } = require('../dbStore/schemaModel/CpmPasComponentCountSchema.js');

const getCpmDprDetails = async(req, res, next) => {
	const allCpmData = await CpmBasicDetailsModel.find(next);
	let componentData = await getCpmDprComponentCountDetails(req , next);
	let responseArray = [];
	await Promise.all( allCpmData.map(async(data) => {
	const { targetCount, duplicateCount, accomonCount} = data;
	let newData = {} ;
	Object.assign(newData , data)
	const total = parseInt(targetCount)+ parseInt(duplicateCount)+ parseInt(accomonCount);
	newData['_doc']['totalCount'] = total;
	newData['_doc']['componentCount'] = componentData[data.dprName].componentCount;
	responseArray.push(newData['_doc']);
}));
	return responseArray;
}

const getDprDetails = async(req, next) => {
	const { dprName } = req;
	const allCpmData = await CpmBasicDetailsModel.find({ dprName });
	let componentPasData = await getPasComponentCountDetails(req , next);
	let pasComponent = {} ;
	let dprDetailsArray = [];
	const { accomonPathList , duplicatePathList , targetPathList } = allCpmData[0];
	await Promise.all(targetPathList.map(async(data) => {
		pasComponent = componentPasData[data].componentCount;
		dprDetailsArray.push({
			fileType : 'Target',
			path : data,
			componentCount:pasComponent
		})
	}))
	await Promise.all(duplicatePathList.map(async(data) => {
		pasComponent = componentPasData[data].componentCount;
		dprDetailsArray.push({
			fileType : 'Duplicate',
			path : data,
			componentCount:pasComponent
		})
	}))

	await Promise.all(accomonPathList.map(async(data) => {
		dprDetailsArray.push({
			fileType : 'AcCommon',
			path : data,
			componentCount:'-'
		}) 
	}))
	return dprDetailsArray;
}

const getCpmPasFileDetails = async(req, next) => {
  const { path } = req;
  const allCpmPasFileData = await CpmPasFileDetailsModel.find({ path });
  return allCpmPasFileData;
}

const getCpmDprComponentCountDetails = async(req, next) => {
	  const allCpmDprComponenteData = await CpmDprComponetDetailsModel.find();
	  let allComponentDprData = {};
	  allCpmDprComponenteData.map(componentData => {
		  let componentObject = {};
		  componentObject = {
			componentCount : componentData['componentCount']
			};
		  allComponentDprData[componentData.dprName] = componentObject;
	  });
	 //console.log('allComponentDprData',allComponentDprData);
	  return allComponentDprData;
	}

	const getDprComponentDetails = async(req, next) => {
		const { dprName } = req;
		const allDprComponenteDetails = await CpmDprComponetDetailsModel.find({ dprName });
		return allDprComponenteDetails;
	  }

	  const getPasComponentCountDetails = async(req, next) => {
		const allPasComponentCount = await CpmPasComponetDetailsModel.find();
		let allComponentPasData = {};
		allPasComponentCount.map(componentData => {
			let componentObject = {};
			componentObject = {
			  componentCount : componentData['componentCount']
			  };
			  allComponentPasData[componentData.filePath] = componentObject;
		});
		//console.log('-------------------------------->',allComponentPasData)
		return allComponentPasData;
	  }

module.exports = {
    getCpmDprDetails,
    getDprDetails,
    getCpmPasFileDetails,
	getCpmDprComponentCountDetails,
	getDprComponentDetails,
	getPasComponentCountDetails
}

//getCpmDprDetails();

//getCpmDprDetails();

//getCpmPasFileDetails({ path:"CPM\\cpm_common\\common\\cpm_cmc_batch\\batchResult.pas"});
