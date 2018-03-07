User.destroy_all
u1 = User.create name:"user1", email:"user1@gmail.com", password:"chicken", profile_pic:"https://fillmurray.com/100/100"
u2 = User.create name:"user2", email:"user2@gmail.com", password:"chicken", profile_pic:"https://fillmurray.com/100/100"
u3 = User.create name:"user3", email:"user3@gmail.com", password:"chicken", profile_pic:"https://fillmurray.com/200/200"
u4 = User.create name:"user4", email:"user4@gmail.com", password:"chicken", profile_pic:"https://fillmurray.com/100/100"
puts "Number of Users: #{User.all.length}"


#
Snap.destroy_all
s1 = Snap.create snap:"http://res.cloudinary.com/tnpriyanka12/image/upload/v1520392987/download_6_fo6ga8.gif", snap_name: "mysnap11"
s2 = Snap.create snap:"http://res.cloudinary.com/tnpriyanka12/image/upload/v1520315711/u4ztuvjaeqcnzi0xsxtr.png", snap_name: "mysnap21"
s3 = Snap.create snap:"http://res.cloudinary.com/tnpriyanka12/image/upload/v1520315056/e6x08wcn49kldugrspgq.png", snap_name: "mysnap12"
s4 = Snap.create snap:"http://res.cloudinary.com/tnpriyanka12/image/upload/v1520315711/u4ztuvjaeqcnzi0xsxtr.png", snap_name: "mysnap22"
s5 = Snap.create snap:"http://res.cloudinary.com/tnpriyanka12/image/upload/v1520319720/i9qc4qcurzwbg4slqhog.png", snap_name: "mysnap31"
s6 = Snap.create snap:"http://res.cloudinary.com/tnpriyanka12/image/upload/v1520392461/qws55dzpdqsbewzcqgnf.png", snap_name: "mysnap41"
puts "Number of Snaps: #{Snap.all.length}"

Comment.destroy_all
c1 = Comment.create comment_string:"Great Snap!!"
c2 = Comment.create comment_string:"Awesome Snap!!"
c3 = Comment.create comment_string:"Gud Snap!!"
c4 = Comment.create comment_string:"Super!!"
c5 = Comment.create comment_string:"wowwwwww!!"
c6 = Comment.create comment_string:"ewwww!!"
c7 = Comment.create comment_string:":) Snap!!"
c8 = Comment.create comment_string:"Great pic!!"
c9 = Comment.create comment_string:":) :)!!"
c10 = Comment.create comment_string:":)!!!!!!!!!!!!!!!!!"
puts "Number of Comments: #{Comment.all.length}"


u1.snaps << s1 << s3
u2.snaps << s2 << s4
u3.snaps << s5
u4.snaps << s6

s1.comments << c1 << c2 << c3
s2.comments << c4 << c5
s3.comments << c6
s4.comments << c7
s5.comments << c8
s6.comments << c9 << c10


u1.comments << c1 << c2
u2.comments << c3
u3.comments << c4 << c5
u4.comments << c6 << c7 << c8 << c9 << c10
