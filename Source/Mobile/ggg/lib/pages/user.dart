import 'package:flutter/material.dart';
import 'package:ggg/get_yo_girl_a_gift.dart';
import 'package:ggg/pages/login.dart';
import 'package:ggg/pages/profile.dart';
import 'dart:ui';

class UserScreen extends StatefulWidget {
  
  final Data data;

  UserScreen({Key key, this.data}) : super(key: key);

  @override
  _UserScreenState createState() => _UserScreenState(data);
}

class _UserScreenState extends State<UserScreen> {

  Data data;
  _UserScreenState(this.data);

  Image getGirlImage(User user, int index)
  {
    return (Image.memory(user.girls[index].images[0].image));
  }

  MaterialButton createGirlButton(Girl girl, Image image)
  {
    MaterialButton button = new MaterialButton(child: image,onPressed: ()
      async { Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => Profile(girl: girl)));
    });

    return button;
  }

  List<MaterialButton> getButtonList(User user) {
    List<MaterialButton> girlButtons = [];
    int length = user.girls.length;
    for (int i = 0; i < length - 1; i++)
    {
      Image image = getGirlImage(user, i);
      MaterialButton button = createGirlButton(user.girls[i], image);
      girlButtons.add(button);
    }
    return girlButtons;
  }

  @override
  Widget build(BuildContext context) {

    final titleText = Text("yo Girls", style: TextStyle(color: Colors.white,
    fontSize: 50.0, fontWeight: FontWeight.bold, decoration: TextDecoration.underline), 
    textAlign: TextAlign.center);
    List<Widget> girlButtons = getButtonList(data.user);

    return Scaffold(
      resizeToAvoidBottomPadding: true,
      body: Center(
        child: Container(
          color: Colors.black,
          child: Padding(
            padding: const EdgeInsets.all(36.0),
            child: ListView(
              scrollDirection: Axis.vertical,
              children: <Widget>[
                SizedBox(height: 15.0),
                titleText,
                SizedBox(height: 30.0),
                Column(children: girlButtons),
                SizedBox(height: 15.0)
              ]
            ),
          ),
        ),
      ),
    );
  }
}