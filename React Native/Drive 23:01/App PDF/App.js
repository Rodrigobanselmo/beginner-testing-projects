import React, {useState} from 'react';
import {SafeAreaView,StyleSheet,Platform,Dimensions,Text,View,TouchableOpacity,} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import RNFetchBlob from 'rn-fetch-blob'
import Pdf from 'react-native-pdf';


const App = () => {

  //localizacao dos diretorios
  const [path, setpath] = useState()
  const [pdf, setpdf] = useState(false)

  const printPDF = async () => {
    const results = await RNHTMLtoPDF.convert({
      html: `
      <h1 style='color:red;'>Demo Text0hbuhjihu to converted to PDF</h1>
      <h2>Demo Text0hbuhjihu to converted to PDF ${pdf}</h2>
      <img style='width:100' src='https://img.freepik.com/fotos-gratis/gotas-de-oleo-na-imagem-abstrata-padrao-psicodelico-de-agua_23-2148290141.jpg?size=626&ext=jpg'>
      `,
      fileName: 'test10',
      directory: 'docs',
    });
    //await RNPrint.print({filePath: results.filePath});
    console.log(results.filePath)
  };

  //console.log(RNFetchBlob.fs.dirs)    
  const pdfDownload = async () => {
    /* RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      path : RNFetchBlob.fs.dirs.DownloadDir + '/nomeDoArquivo.pdf'
    })
    //exemplo de pdf online
    .fetch('GET', 'http://samples.leanpub.com/thereactnativebook-sample.pdf', {
      //some headers ..
    })
    .then((res) => {
      //me da localizacao do path
      console.log('The file saved to ', res.path())
      setpath(res)
    }) */
    RNFetchBlob
    .config({
        addAndroidDownloads : {
            useDownloadManager : true, // <-- this is the only thing required
            path : RNFetchBlob.fs.dirs.DownloadDir + '/nomeDoArquivo.pdf',
            notification : true,
            title : 'nomeDoArquivo.pdf',
            description : 'An APK that will be installed',
            // Optional, override notification setting (default to true)
            // Optional, but recommended since android DownloadManager will fail when
            // the url does not contains a file extension, by default the mime type will be text/plain
            description : 'File downloaded by download manager.'
        }
    })
    .fetch('GET', 'http://samples.leanpub.com/thereactnativebook-sample.pdf')
    .then((resp) => {
      // the path of downloaded file
      console.log(resp.path())
    })
  };

  const source = {uri:'file:///storage/emulated/0/docs/test10.pdf',cache:false}
  //const source = {uri:'file:///storage/emulated/0/docs/test.pdf'};
  const voltar = () => {
    setpdf(!pdf)
  };

  const printRemotePDF = async () => {
    const results = await RNPrint.print({
      filePath: 'file:///storage/emulated/0/docs/test10.pdf',
    });
    console.log(results)
  };


  return (
    <SafeAreaView style={{flex: 1}}>
      {pdf ? 
      <View style={styles.containerPDF}>
          <Pdf
              source={source}
              onLoadComplete={(numberOfPages,filePath)=>{
                  console.log(`number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page,numberOfPages)=>{
                  console.log(`current page: ${page}`);
              }}
              onError={(error)=>{
                  console.log(error);
              }}
              onPressLink={(uri)=>{
                  console.log(`Link presse: ${uri}`)
              }}
              style={styles.pdf}/>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={voltar}>
          <Text>Download PDF da net</Text>
        </TouchableOpacity>
      </View>
      :
      <>
      <Text style={styles.titleText}>
        Print HTML as a Document from React Native App
      </Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={pdfDownload}>
          <Text>Download PDF da net</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={voltar}>
          <Text>Click to Print PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={printPDF}>
          <Text>Click to Print Remote PDF</Text>
        </TouchableOpacity>
      </View>
      </>
      }
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginVertical: 10,
  },
  containerPDF: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
},
pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
}
});