import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class FeedbackPage extends StatefulWidget {
  @override
  _FeedbackPageState createState() => _FeedbackPageState();
}

class _FeedbackPageState extends State<FeedbackPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[900],
      appBar: AppBar(
        title: Text('FEEDBACK'),
        centerTitle: true,
        backgroundColor: Colors.red,
        elevation: 0.0,
      ),

      body: Padding(
        padding: const EdgeInsets.fromLTRB(20.0, 30.0, 20.0, 10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              children: <Widget>[
                Icon(Icons.favorite, color: Colors.redAccent,),
                Padding(padding: EdgeInsets.fromLTRB(0.0, 0.0, 15.0, 0.0),),
                Text('Likability', style: TextStyle(color: Colors.white, fontSize: 20.0, letterSpacing: 1.5),),
              ],
            ),
            Container(
              child: Divider(height: 15.0, color: Colors.red),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text('24/100', style: TextStyle(color: Colors.white, fontSize: 35.0),),
                Icon(Icons.sentiment_dissatisfied, color: Colors.orange, size: 50.0,),
              ],
            ),

            Padding(padding: EdgeInsets.fromLTRB(0.0, 50.0, 0.0, 0.0),),

            Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: <Widget>[
                Icon(Icons.shopping_cart, color: Colors.redAccent,),
                Padding(padding: EdgeInsets.fromLTRB(0.0, 0.0, 15.0, 0.0),),
                Text('Chance of Return', style: TextStyle(color: Colors.white, fontSize: 20.0, letterSpacing: 1.5),),
              ],
            ),
            Container(
              child: Divider(height: 15.0, color: Colors.red),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text('5%', style: TextStyle(color: Colors.white, fontSize: 35.0),),
                Icon(Icons.sentiment_very_satisfied, color: Colors.green, size: 50.0,),
              ],
            ),

            Padding(padding: EdgeInsets.fromLTRB(0.0, 50.0, 0.0, 0.0),),

            Row(
              children: <Widget>[
                Icon(Icons.people, color: Colors.redAccent,),
                Padding(padding: EdgeInsets.fromLTRB(0.0, 0.0, 15.0, 0.0),),
                Text('Friend Jealousy', style: TextStyle(color: Colors.white, fontSize: 20.0, letterSpacing: 1.5),),
              ],
            ),
            Container(
              child: Divider(height: 15.0, color: Colors.red),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text('50/100', style: TextStyle(color: Colors.white, fontSize: 35.0),),
                Icon(Icons.sentiment_neutral, color: Colors.yellow, size: 50.0,),
              ],
            ),
          ],
        ),
      ),

    );
  }
}
