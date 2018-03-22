const sudokus = {
  veryeasy: [
    "HI6G4BAEC5A28F347ID7CAE9FBHAF8CIG5D224G5HAI3F3EIF2D8A7FCADG8B95I8D2CEG617BE91F3HD",
    "D925GH6A3GHFBAC4E9EA364I8B7I6D7HABC5CG1D2E9FHHBE9C67DAFD8C5G1IBB3G1IDEH61E9HFBCG4",
    "ED19HGB3FIBHC6E47AFG3D128EIG8IFB43AEBAE7I3FH4C6D8EAI27HE7BDIAFCD321G659HA9FECHGDB",
    "GCD59BHF1HE91C6DGBAFBD78CEI2AFIH35DG54C2AGI8F97HFED1B3D9A7FE23H6H5CBA79D3BGH4I6AE",
    "ED27FHI138GA3BIED669C5DA2GHIC78ABF5DDB8FI57C1AFE4CGH9BG5D2HC1FIC8I1EFDBG2A6I7D3HE",
    "BE964HCG1FA3IGB48547HAC5IF2GFBH5D1395CD7A96BHI81C2F5DG34E2H1GIFHIG5FCBADA2FDIGHEC",
    "2HA749EF3D5GC6298AC6951HD7B6I8BEAG3DAC48GFBEI72E4I3HAFHAB9C5F47I7CFHD1B5EDFAB73IH",
    "EDICHFA7B8F27EA3I4GC129D8F5C76H42IE1B1HI3EFDGDI56AGBHC98G5B34AFAE34FIGBH6BDAG8ECI"
  ],
  easy: [
    "39AHG6DEBE2GC1D6IHF48EIBCAG8A3BDGEFI7FI1EHBC425DIFCH7AIHBG35AD6ACFD89G25DGEF2AI83",
    "GI45CABFH2FCG4H5191EHIFBCG49G531FDH24C1HB57IFH2F49GA3ECDBF7IHE1EA92HCFDG6HGA5D923",
    "27ADIF8EC9F5HBCD7AC4857AFBIDAGFEB9CH89B3A47F553F7H914BGBCA68EI4FHD9C52AGA5924GCHF",
    "G3I6BE4HADF1CI8EG28BEA4GFIC2937E1HD6AHDBF9CE7FEG8CD1BII1HEGC2FDE724169CHCD6IHBGA5",
    "I6ADC2E8G2GCHEID1FH4EF71BCI58G9AFC42DC6E271I8AB93HDFGEFEDA9H7BCC9BGD58FA71HBF3IED",
    "47IB1F8EC5F2C4H9AGH31EI7FDB72DF5C1HI3H6AGIDB5I15D8B3GFAI8G3E2FD64GIB1E3H25C8FDGI1",
    "ABDFHEG3IH3G9BD16EIEF71CBDHDFCHEGIA251BCIFHGD7HIA4B3E6CG8DF95BABD1E3869GF95BG14H3",
    "56IGBHADC2AC9DF7EHDH7ACE692G4856ACBIC2A4GI5H6F9E2HCD71ICB6E7HADHEDC1B967A7FHI4B3E"
  ],
  medium: [
    "4E6AIHG23G8CBFDAEI1I257CFHD5GIF32D1HB6H4AECIG3DAG8I5FBHA53BG9D6F2GIDAH3EIC4HE6BG1",
    "7FID5ABHCCAHI7BD5FBE46C8A9G9HB54F37AAG5C296D8D3F8AGIB5FI1BHE7CDHDGAI35FB5BCGF4H19",
    "G68AIB5DC1CD5HF9B7BE94GCH6AD726EAC9HI1FCBH7E43HE7DIFA2FIGH1DBC5ED3BF7AHIH2A9CE4GF",
    "IFB1CGHD55HGBIDAC63DA5HF927D2IC5AGF8F73H4IEAB1EH6GB3IDGI5D63BHABC4GA8FE98AF9BED7C",
    "I7DFA835B1CF92EDG8EHBGCDAFID5CBI678A6B75HAIC4HI1DG3EB6C49HF7B1EBA8CE9FD77FE14BHI3",
    "14I76H23EE8FDB3IAGCBGAE94FHFG2HCA549HE36IDAGB9AD5GBFHC731IDEHB6DFEB8GC9ABIHC1FGE4",
    "DGHA3B65IE31IFDGB89B6EGHADC1D3HBFEIG65B7IACHDGHIC452FAHIE2A3D76BAD6H79C5CFG45IH12",
    "6GE3D9HA2HC15GBFIDDBIFAHCE72DG9H35FA5AH7FDI2C39F1BEGD8AFBHIG4CE9HCD5ABGF75D2CF1HI",
    "CEIAGBH4FFBGDH39EADHA5FICGBHA3F4EBI7EG49B8F1CIF2C1G58D7CH2EA46I2DEG9FAC81IF8C4GB5"
  ],
  tough: [
    "FG2HCD9AE5AHG294FC4C9F5A872HDE1GFBCI19G34BEH62FCEIHGDACBADH5F9GI862AGC5DG5D9F3128",
    "C74EH2IF1BFE3A987D1HIGDF3BEFDAHG52IC8CB96AD5G59GDBC1H6IEH6C4GAB72CAEHFDI4A6B975CH",
    "26AC9GH5DIH3DBEA6G754A6H9C259FBG1DHCAGH94CF2543BEHF7IA647H32EA982E7AICD6CA96EDBGH",
    "7DBHF5I3A6A943BEGHHCEI7AFD25B83IDAF7IFABEGDHCD7CF18B9E39GA26HED2HFEDCG1IAE4G8ICB6",
    "CD7FH9EB19EFABDH7CHBAE3G96DDGEB9CAH6A93DF8G5268B75A3DIGFI8A2DC52CDI7E6AHEA83DFBIG",
    "G1DFH2E398ECI1GDB6IBFEC4HAGC9AG5F2HD28EA49GF364GH23I5AA3IBG8F4E4FHC9EA725GBDFACIH",
    "1H3DF97EB76BEC1HI445IHG26ACBIHAECD7F6AG9BD5CHE3DG8FAB9HD139GBF5CB561H9DGIG6B45CH1"
  ],
  verytough: [
    "DIH15FGBCBE3HD761IFAG9C2EH43G4FHABIEI6A5BC47HH25GIDAC6GH94AECFBECFB7I8D11DBCFHI57",
    "CF4H1EGB957I4FBHCA1HBG935FDDCAFH72IEHBGI5DC1FIE63BADG824HAGIFE3FA52CH9DGG9CE4F18B",
    "3E4IA78FB6IB8CDAE771HF2EC4ID8ICFBGAE5B7DI1F8CA63G5HBI4H752DF9CA23AEH9D7FID6AGCEBH",
    "D27A9C86EHIFBGEDC1E314H6B7I1GH9F254CF437E81IBIEBCADGH6GAEF4IC2HC6D8BAIE72HIECG6AD",
    "F8AID23G5E2GAHC9FD3DIEFGB18D76B5AH9CIABH346EGHCE7IFA427IHF25DCAAF34G8EB9BE43AIGHF",
    "FC18EGBI4G9D2CAE6HBHEF49GCA31HEF2ID7D57IH3FABI2FG1D8EC8DIAG6CB5AGBC9ED86E6CD2H1G9",
    "G395D8126DB16ICGHEF8EGBADI3HD3BAEF7I5623G9H41AIGHF4CE2C14IHB5FG9EFDCGB18BGH1E6ICD",
    "675A2IDC8ADICHG5F23B8E4FG9AEA7FI3HBDD6C2589AGHIBDG1FE37CA8FEB49B86IADCGEIE47CB186",
    "F45ACI7B83GBF8E4IA9HAGDBE638EF9GDAC2D2381FIGE1IGE23FHDECH4FGB197ADBI8C5FBFIC518DG",
    "H5DCFGB19A97BDH3EF26CEAIHGD31HI26GDE6GB45AI3HE49HG3F2ADCEF92AHGGHF13DEI2IBAG8E46C",
    "ED1F3BIG88B95AGC4FC7FDI82EA1I726C5HDBFHGD51CID3EAHI6BG7HC95FDA2FA2C7DH9EI5DHB17FC",
    "F14CBHIE78BIG15C6DGECF9DA8BA9BHG65DCDH6E3IGB1EC72DA6IHC4HIEG2A69GADF2HCE2FEA83D7I",
    "C7A98BEFDE9HAFD7B32F4CEGHAIAH2GC54IFDE76A9CHBF3I4BHAGE9DCHGFB51G1EBICFD88BFE4AI3G",
    "A8C4BFE9GIFDECG1B85B7HAIFDC459CF82GAH3AGI2DEFFG21DE3H97DHF5A932CIFB7DH1E2A59HCGF4",
    "H7I1EF2DCEA4CIBHG63FBH7DEAIBHG4CEFI11DFGH93BEIC5BFAD8G4ECI1HG6BG2AFD39EHFI85BGAC4"
  ]
};

export default sudokus;