import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:async';
import 'package:image_picker/image_picker.dart';

class Camera extends StatefulWidget {
  @override
  _CameraState createState() => _CameraState();
}

class _CameraState extends State<Camera> {

  File imageFile;

  _openGallery(BuildContext context) async{
    var picture = await ImagePicker.pickImage(source: ImageSource.gallery);
    this.setState(() {
      imageFile = picture;
    });
    Navigator.of(context).pop();
  }

  _openCamera(BuildContext context) async{
    var picture = await ImagePicker.pickImage(source: ImageSource.camera);
    this.setState(() {
      imageFile = picture;
    });
    Navigator.of(context).pop();
  }

  Future<void> _showChoiceDialog(BuildContext context){
    return showDialog(context: context, builder: (BuildContext context){
      return AlertDialog(
        title: Text('Choose'),
        content: SingleChildScrollView(
          child: ListBody(
            children: <Widget>[
              GestureDetector(
                child: Text('Gallery'),
                onTap: () {
                  _openGallery(context);
                },
              ),
              Padding(padding: EdgeInsets.all(8.0),),
              GestureDetector(
                child: Text('Camera'),
                onTap: () {
                  _openCamera(context);
                },
              ),
            ],
          ),
        ),
      );
    });
  }

  Widget _decideImageView () {
    if (imageFile == null) {
      return Text('No Image Selected', style: TextStyle(color: Colors.white),);
    }
    else {
      return Image.file(imageFile, width: 400,height: 400);
    }
  }

  Future<void> evaluate() async {

  }

  Future<void> getData() async{

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[900],
      appBar: AppBar(
        title: Text("CAMERA"),
        centerTitle: true,
        backgroundColor: Colors.grey[700],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.pushNamed(context, '/feedbackpage');
        },
        backgroundColor: Colors.red,
        label: Text('CONFIRM'),
      ),
      body: Container(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              _decideImageView(),
              Padding(padding: EdgeInsets.fromLTRB(0.0, 10.0, 0.0, 0.0),),
              FlatButton(onPressed: () {
                _showChoiceDialog(context);
              },
              child: Text('Select Image'),
              color: Colors.red,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
