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
                    data = result.BRANCHES.BRANCH;
                }
            })
        })
        .catch((error) => {
            console.log(error);
        })

        function getBanks(str) {
            let bankNames = new Map();
            data.forEach((item) => {
                const bankName = item.Bank_Name;
                    bankCode = item.Bank_Code;
                if (bankName.includes(str)) {
                    bankNames.set(bankName, bankCode);
                }
            }) 
            return Array.from(bankNames.entries());  
        }

        /**
         * get branches of a particular bank
         */
        function getBranches(bank) {
            if (!bank) {
                return;
            } else {
                return data.filter((item) => item.Bank_Name === bank);
            }
        }
        /**
         * 
         */
        function getInfo(bank, branch) {
            if (!bank || !branch) {
                return;
            } else {
                // const bankCode = bank.toString(), 
                //     branchCode = branch.toString();
                    const branches = getBranches(bank);
                    console.log(branches)
                   return branches.find((item) => item.Branch_Name === branch);
                
            }            
        }

        return {
            getBanks,
            getBranches,
            getInfo
        };
}());

module.exports = dataStore;