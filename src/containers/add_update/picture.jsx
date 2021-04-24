import React,{Component} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqUpdataRemove} from '../../ajax'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default class Picture extends Component{
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };
  setImgs =(imgsArr)=>{
    let result =[]
    imgsArr.forEach((imgName,index)=>{
      result.push({uid:-index,name:imgName,url:`/upload/${imgName}`})
    })
    this.setState({fileList:result})
  }
  getImgNames =()=>{
    let result =[]
    this.state.fileList.forEach((obj)=>{
      result.push(obj.name)
    })
    return result
  }
  //预览关闭回调
  handleCancel = () => this.setState({ previewVisible: false });
  //浏览回调
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  //需要改的，图片上传状态改变
  handleChange = async({ file, fileList }) => {
    if(file.status === 'removed'){
      
      let result = await reqUpdataRemove(file.name)
      console.log(result)
      const {status,msg} = result
      if(status ===0){
        message.error('remove success')
      }else{
        message.error(msg)
      }
    }
    if(file.status === 'done'){
      const {status,data,msg} = file.response
      const {name,url} = data
      //提高性能
      if(status ===0){
        message.success('update success')
        fileList[fileList.length-1].name = name
        fileList[fileList.length-1].url = url
      }else{
        message.error(msg)
      }
    }
    this.setState({ fileList });
    }

  render(){
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return(
      <>
        <Upload
          action="/manage/img/upload" //上传服务器地址
          name = "image" //上传名字
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    )
  }
}
