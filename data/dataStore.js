const xml2js = require('xml2js');
const axios = require('axios');
/**
 * 
 */
const dataStore = (function() {
    console.log('data store required');
    const parser = new xml2js.Parser({explicitArray: false});
    let data = {};

    axios.get('https://www.boi.org.il/he/BankingSupervision/BanksAndBranchLocations/Lists/BoiBankBranchesDocs/snifim_dnld_he.xml')
        .then((res) => {
            parser.parseString(res.data, (error, result) => {
                if (error) {
                    console.log(`xml2js Error: ${error}`)
                } else {
                    data = (result).BRANCHES.BRANCH;
                }
            })
        })
        .catch((error) => {
            console.log(error);
        })

        /**
         *  
         */
        function getBanks(str) {
            console.log('Method: getBanks')
            return data;            
        }
        /**
         * 
         */
        function getBranches(bank) {
            if (!bank) {
                return;
            } else {
                const bankCode = bank.toString();
                return data.filter((item) => item.Bank_Code === bankCode);
            }
        }
        /**
         * 
         */
        function getInfo(bank, branch) {
            if (!bank || !branch) {
                return;
            } else {
                const bankCode = bank.toString(), 
                    branchCode = branch.toString();
                    const branches = getBranches(bankCode);
                   return branches.find((item) => item.Branch_Code === branchCode);
            }            
        }

        return {
            getBanks,
            getBranches,
            getInfo
        };
}());

module.exports = dataStore;