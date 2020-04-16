import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'dart:convert';
import 'package:ggg/get_yo_girl_a_gift.dart';
import 'package:ggg/pages/user.dart';
import 'package:ggg/pages/login.dart';

Uri baseAddress = Uri.http("getyogirlagift.azurewebsites.net", "");

class Profile extends StatefulWidget {

  Profile({Key key, this.girl}) : super(key: key);
  final Girl girl;

  @override
  _ProfileState createState() => _ProfileState(girl);
}

class _ProfileState extends State<Profile> {

  Girl girl;
  _ProfileState(this.girl);

  String name = "";
  Relationship relationship;
  List<GirlImage> images;
  List<ImportantDate> importantDates;
  List<Interest> interests;

  Future<void> getData() async{
    GetYoGirlAGiftClient test = new GetYoGirlAGiftClient(baseAddress);
    String token = await test.getToken();

    //login
    User user = await test.login(token, "boo", "myPassword");

    setState(() {
      this.name = (user.girls[1].name);
      this.relationship = (user.girls[1].relationship);
      this.interests = (user.girls[1].interests);
      this.importantDates = (user.girls[1].importantDates.);
      this.images = (user.girls[1].images);

      getName(name);
      getRelationship(relationship);
      getInterests(interests);
      getImportantDates(importantDates);
      getGirlImage(images);
    });
  }

  Future<String> getName(String name) async{
    return name;
  }

  Future<Relationship> getRelationship(Relationship relationship) async{
    return relationship;
  }

  List<Interest> getInterests(List<Interest> interests){
    return interests;
  }

  List<ImportantDate> getImportantDates(List<ImportantDate> importantDates){
    return importantDates;
  }

  List<GirlImage> getGirlImage(List<GirlImage> images){
    return images;
  }
  

/*
  List<MaterialButton> getImages(image) {
    List<Image> girlImage = [];

    int length = user.girls.length;

    for (int i = 0; i < length - 1; i++)
    {
      Image image = getGirlImage(user, i);

    }

    return girlImages;
  }
*/
  @override
  void initState() {
    super.initState();
    getData();
  }

  @override
  Widget build(BuildContext context) {
    
    //List<Widget> girlImages = getGirlImage(this.images);

    print(this.name);
    print(this.relationship);

    


    return Scaffold(
      backgroundColor: Colors.grey[900],
      appBar: AppBar(
        title: Text('PROFILE'),
        centerTitle: true,
        backgroundColor: Colors.red,
        elevation: 0.0,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, '/camera');
        },
        backgroundColor: Colors.red,
        child: Icon(Icons.camera_alt),

      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(25.0, 15.0, 25.0, 10.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              margin: EdgeInsets.all(0.0),
              height: 200.0,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: <Widget>[
                  //Row(children: this.images),
                ],
              ),
            ),
            SizedBox(height: 20.0,),
            Divider(
              height: 30.0,
              color: Colors.grey[400],
              thickness: 0.5,
            ),
            Text(
              //print name
              this.name,
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.grey[200],
                fontSize: 25.0,
              ),
            ),
            Text(
              this.relationship.toString(),
              style: TextStyle(
                letterSpacing: 2.0,
                color: Colors.redAccent,
                fontSize: 15.0,
              ),
            ),
            SizedBox(height: 15.0,),
            Container(
              margin: EdgeInsets.all(0.0),
              height: 200.0,
              child: ListView(
                children: <Widget>[
                  Container(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          'Interests',
                          style: TextStyle(color: Colors.white, fontSize: 15.0),
                        ),
                        Divider(height: 5.0, color: Colors.grey[800],),
                        Text(
                          this.interests.toString(),
                          style: TextStyle(color: Colors.grey[500],),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 15.0,),
                  Container(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          'Important Dates',
                          style: TextStyle(color: Colors.white, fontSize: 15.0),
                        ),
                        Divider(height: 5.0, color: Colors.grey[800],),
                        Text(
                          this.importantDates.toString(),
                          style: TextStyle(color: Colors.grey[500],),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
