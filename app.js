const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')
const serviceAccount = require('./serviceAccountKey.json')

const bcrypt = require('bcrypt')
const slugify = require('slugify')
const jwt = require('jsonwebtoken')
const token_secret = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

app.use(cors({origin: '*'}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Running')
})

//register
app.post('/api/register', async (req, res) => {
  
  try{

    let req_name = req.body.name
    let req_email = req.body.email
    let req_password = req.body.password

    if(!req_name || !req_email || !req_password){

      res.status(401).json({
        success: false,
        message: "All field is required.",
      })

    }else{

      const usersRef = db.collection('users')
      const users = await usersRef.where('email', '==', req_email).limit(1).get()

      if(!users.empty){

        res.status(403).json({
          success: false,
          message: "Email already registered.",
        })

      }else{

        const data = {
          name: req_name,
          email: req_email,
          password: bcrypt.hashSync(req_password, 8),
          description: '',
          profile_credential: '',
          employment_credential: '',
          education_credential: '',
          location_credential: '',
          created_at: Timestamp.now(),
        }
  
        await db.collection('users').add(data).then(function(docRef){
          data.id = docRef.id
        })
  
        res.status(200).json({
          success: true,
          message: "Register success.",
          data,
        })
      }
  
    }
    
  }catch(err){

    res.status(500).json({
      success: false,
      message: "Register failed ( " + err.message + " )."
    })

  }

})

//login
app.post('/api/login', async (req, res) => {

  try {

    let req_email = req.body.email
    let req_password = req.body.password

    if(!req_email || !req_password){
      res.status(401).json({
        success: false,
        message: "All field is required.",
      })
    }else {
      
      const usersRef = db.collection('users')
      const users = await usersRef.where('email', '==', req_email).limit(1).get()
  
      if(!users.empty){
  
        users.forEach(doc => {
          
          bcrypt.compare(req_password, doc.data().password, function(err, result){
  
            if(result != true){
  
              res.status(401).json({
                success: false,
                message: "Email or password is wrong.",
              })
  
            }else {
  
              let data = {
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                profile_credential: doc.data().profile_credential,
                employment_credential: doc.data().employment_credential,
                education_credential: doc.data().education_credential,
                location_credential: doc.data().location_credential,
                description: doc.data().description,
                created_at: doc.data().created_at,
              }
    
              res.status(200).json({
                success: true,
                message: "Login success.",
                data,
              })
            }
  
          })
  
        })
  
      }else{
  
        res.status(403).json({
          success: false,
          message: "Email not found.",
        })
  
      }

    }

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Login failed",
    })

  }

})

//store question
app.post('/api/questions', async (req, res) => {

  try{

    let req_question = req.body.question
    let user_id = req.body.user_id

    if(!req_question ){

      res.status(401).json({
        success: false,
        message: "Question field is required.",
      })

    }else{

      const questionsRef = db.collection('questions')
      const questions = await questionsRef.where('question', '==', req_question).limit(1).get()
  
      if(!questions.empty){
        
        res.status(403).json({
          success: false,
          message: "A question with the same title has already been asked.",
        })
  
      }else{
  
        const data = {
          question: req_question,
          created_at: Timestamp.now(),
          user_id: user_id
        }
    
        await db.collection('questions').add(data).then(function(docRef){
          data.id = docRef.id
        })
    
        res.status(200).json({
          success: true,
          message: "Create question success.",
          data: data
        })
  
      }

    }

  }catch(err){

    res.status(500).json({
      success: false,
      message: "Create question failed (" + err.message + ")."
    })

  }
})

//get all question
app.post('/api/questions/limit/:limit', async (req, res) => {

  try {

    let user_id = req.body.user_id

    let limit = parseInt(req.params.limit)
    
    const questionsRef = db.collection('questions')
    const questions = await questionsRef.orderBy('user_id').where('user_id', '!=', user_id).orderBy('created_at', 'desc').limit(limit).get()

    const questionsArray = [] 

    if(questions.empty){
      
      res.status(200).json({
        success: true,
        message: "No questions.",
        data: null
      })

    }else{

      questions.forEach(async doc => {

        const data = {
          id: doc.id,
          question: doc.data().question,
          created_at: doc.data().created_at,
        }

        questionsArray.push(data)

      })

      res.status(200).json({
        success: true,
        message: "Get questions success.",
        data: questionsArray,
      })

      }
    

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Get question failed (" + err.message + ")."
    })

  }

})

//get other question
app.post('/api/questions/other', async (req, res) => {

  try {

    let question = req.body.question
    
    const questionsRef = db.collection('questions')
    const questions = await questionsRef.where('question', '!=', question).limit(5).get()

    const questionsArray = [] 

    if(questions.empty){
      
      res.status(200).json({
        success: true,
        message: "No ther questions.",
        data: null
      })

    }else{

      questions.forEach(async doc => {

        const data = {
          id: doc.id,
          question: doc.data().question,
          created_at: doc.data().created_at,
        }

        questionsArray.push(data)

      })

      res.status(200).json({
        success: true,
        message: "Get other questions success.",
        data: questionsArray,
      })

      }
    

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Get other question failed (" + err.message + ")."
    })

  }

})

//get single question with answers
app.get('/api/question/:id', async (req, res) => {

  try {

    const id = req.params.id
    const questionsRef = db.collection('questions')
    const question = await questionsRef.doc(id).get()
   
    if(!question.exists){

      res.status(404).json({
        success: false,
        message: "Question not found."
      })

    }else{

      const answers = await db.collection('answers').where('question_id', '==', id).get()

      const answersArray = []

      answers.forEach(doc => {
        
        const data = {
          id: doc.id,
          answer: doc.data().answer,
          user_id: doc.data().user_id,
          user_name: doc.data().user_name,
          user_profile_credential: doc.data().user_profile_credential,
          created_at: doc.data().created_at,
        }
  
        answersArray.push(data)

      })

      const questionWithAnswer = {
        id: question.id,
        user_id: question.data().user_id,
        question: question.data().question,
        created_at: question.data().created_at,
        answers: answersArray ?? null
      }

      res.status(200).json({
        success: true,
        message: "Get questions success.",
        data: questionWithAnswer,
      })

    }

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Get question failed ( " + err.message + " )"
    })

  }

})

//get question with user_Id
app.post('/api/questions/user', async (req, res) => {

  try {

    let user_id = req.body.user_id

    if(!user_id){
      
      res.status(401).json({
        success: false,
        message: "User id is required.",
      })

    }else{

      const questionsRef = db.collection('questions')
      const question = await questionsRef.where('user_id', '==', user_id).get()

      if(question.empty){

        res.status(200).json({
          success: true,
          message: "This user doesnt have any questions.",
          data: null,
        })

      }else{

        let questionsArray = []

        question.forEach(doc => {
          const data = {
            id: doc.id,
            user_id: doc.data().user_id,
            question: doc.data().question,
            created_at: doc.data().created_at,
          }
    
          questionsArray.push(data)
        })

        res.status(200).json({
          success: true,
          message: "Get questions user success.",
          data: questionsArray,
        })

      }
    }

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Get questions user failed ( " + err.message + " )"
    })

  }

})


//get question with latest answer
app.post('/api/questions/answer', async (req, res) => {

  try {

      // let user_id = req.body.user_id

      // let questionsArray = []

      // const questionsRef = db.collection('questions')

      // const question = await questionsRef.orderBy('user_id').where('user_id', '!=', user_id).orderBy('created_at', 'desc').get()

      // question.forEach(doc => {

      //   let data = {
      //     id: doc.id,
      //     user_id: doc.data().user_id,
      //     question: doc.data().question,
      //     question_slug: doc.data().question_slug,
      //     created_at: doc.data().created_at,
      //     updated_at: doc.data().updated_at,
      //     answer: null,
      //   }

      //   questionsArray.push(data)

      // })

      // res.status(200).json({
      //   success: true,
      //   message: "Get questions with latest answer success.",
      //   data: questionsArray,
      // })

      let user_id = req.body.user_id

      let answersArray = []

      const answersRef = db.collection('answers')

      const answer = await answersRef.orderBy('user_id').where('user_id', '!=', user_id).orderBy('created_at', 'desc').get()

      answer.forEach(doc => {

        let data = {
          id: doc.id,
          answer: doc.data().answer,
          user_id: doc.data().user_id,
          user_name: doc.data().user_name,
          user_profile_credential: doc.data().user_profile_credential,
          question_id: doc.data().question_id,
          question_question: doc.data().question_question,
          question_user_id: doc.data().user_id,
          created_at: doc.data().created_at,
        }

        answersArray.push(data)

      })

      res.status(200).json({
        success: true,
        message: "Get questions with latest answer success.",
        data: answersArray,
      })


  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Get question with latest answer failed ( " + err.message + " )"
    })

  }

})

//get answers with user_id
app.post('/api/user/answers', async (req, res) => {

  try {

      let user_id = req.body.user_id

      let answersArray = []

      const answersRef = db.collection('answers')

      const answer = await answersRef.orderBy('user_id').where('user_id', '==', user_id).orderBy('created_at', 'desc').get()

      answer.forEach(doc => {

        let data = {
          id: doc.id,
          answer: doc.data().answer,
          user_id: doc.data().user_id,
          user_name: doc.data().user_name,
          user_profile_credential: doc.data().user_profile_credential,
          question_id: doc.data().question_id,
          question_question: doc.data().question_question,
          question_user_id: doc.data().user_id,
          created_at: doc.data().created_at,
        }

        answersArray.push(data)

      })

      res.status(200).json({
        success: true,
        message: "Get questions with latest answer success.",
        data: answersArray,
      })


  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Get question with latest answer failed ( " + err.message + " )"
    })

  }

})

//update question
app.put('/api/question', async (req, res) => {

  try{

    let id = req.body.id
    let user_id = req.body.user_id
    let req_question = req.body.question

    if(!req_question){

      res.status(500).json({
        success: false,
        message: "Question field is required."
      })

    }else {

      let update = {
        question: req_question,
      }
  
      const question = db.collection('questions').doc(id)
  
      if(question.empty){

        res.status(404).json({
          success: false,
          message: "Question not found."
        })

      }else{

        const checkQuestion = await db.collection('questions').doc(id).get()

        if(checkQuestion.data().user_id != user_id)
        {

          res.status(403).json({
            success: false,
            message: "Cant update other user question."
          })

        }else{

          await question.update(update)
  
          res.status(200).json({
            success: true,
            message: "Update question success.",
          })

        }
      }
    }
    
  }catch(err){

    res.status(500).json({
      success: false,
      message: "Update question failed ( " + err.message + " )."
    })

  }
})

//delete question
app.delete('/api/question/delete', async (req, res) => {

  try {
    
    const id = req.body.id
    const user_id = req.body.user_id
    const question = db.collection('questions').doc(id)

    if(question.empty){

      res.status(404).json({
        success: false,
        message: "Question not found."
      })

    }else {

      const checkQuestion = await db.collection('questions').doc(id).get()

      const answers = await db.collection('answers').where('question_id', '==', id).get()

      if(!answers.empty){

        answers.forEach(doc => {
          console.log(doc.data().answer)
        })

      }

      if(checkQuestion.data().user_id != user_id)
      {
        
        res.status(403).json({
          success: false,
          message: "Cant delete other user question."
        })

      }else {

        await question.delete()

        res.status(200).json({
          success: true,
          message: "Delete question success.",
        })

      }
    }

  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: "Delete question failed ( " + error.message + " )."
    })

  }
})


//store answer
app.post('/api/question/answer', async (req, res) => {

  try{

    let req_answer = req.body.answer
    let user_id = req.body.user_id
    let user_name = req.body.user_name
    let user_profile_credential = req.body.user_profile_credential
    let question_id = req.body.question_id

    if(!req_answer ){

      res.status(401).json({
        success: false,
        message: "Answer field is required.",
      })

    }else{

      const question = db.collection('questions').doc(question_id)
      const dataQuestion = await question.get()
    
      if(!dataQuestion.exists){
  
        res.status(404).json({
          success: false,
          message: "Question not found."
        })
  
      }else{

        if(user_id == dataQuestion.data().user_id){

          res.status(500).json({
            success: false,
            message: "Cant answer your own question."
          })

        }else{

          const data = {
            answer: req_answer,
            created_at: Timestamp.now(),
            user_id: user_id,
            user_name: user_name,
            user_profile_credential: user_profile_credential,
            question_id: dataQuestion.id,
            question_question: dataQuestion.data().question,
            question_user_id: dataQuestion.data().user_id
          }
  
          // db.collection('questions').doc(question_id).collection('answers').doc().set(data)
          
          db.collection('answers').add(data)

          res.status(200).json({
            success: true,
            message: "Store answer success.",
          })
  
        }
      
      }
    }

  }catch(err){

    res.status(500).json({
      success: false,
      message: "Store answer failed ( " + err.message + " )."
    })

  }

})

//get user by Id
app.post('/api/user/profile', async (req, res) => {

  try {

    let user_id = req.body.user_id

    if(!user_id){

      res.status(404).json({
        success: false,
        message: "User id is required."
      })

    }else {

      const user = db.collection('users').doc(user_id);

      user.get().then((doc) => {

        if(doc.exists){
          
          let data = {
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            profile_credential: doc.data().profile_credential,
            employment_credential: doc.data().employment_credential,
            education_credential: doc.data().education_credential,
            location_credential: doc.data().location_credential,
            description: doc.data().description,
            created_at: doc.data().created_at,
          }

          res.status(200).json({
            success: true,
            message: "Get user success",
            data
          })

        }else {

          res.status(404).json({
            success: false,
            message: "User not found"
          })

        }

      })

    }

    
  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Get user failed ( " + err.message + " )"
    })

  }

})

//update user credentials
app.put('/api/user/credentials', async (req, res) => {

  try{

    let req_user_id = req.body.user_id
    let req_employment = req.body.employment_credential 
    let req_education = req.body.education_credential 
    let req_location = req.body.location_credential 

    let update = {
      employment_credential: req_employment,
      education_credential: req_education,
      location_credential: req_location,
    }

    const user = db.collection('users').doc(req_user_id)

    if(user.empty){
      res.status(404).json({
        success: false,
        message: "User not found."
      })
    }

    await user.update(update)

    res.status(200).json({
      success: true,
      message: "Update user credentials success.",
    })
    
  }catch(err){

    res.status(500).json({
      success: false,
      message: "Update user credentials failed ( " + err.message + " )."
    })

  }
})

//update user profile
app.put('/api/user', async (req, res) => {

  try{

    let req_user_id = req.body.user_id
    let req_name = req.body.name
    let req_profile_credential = req.body.profile_credential 
    let req_description = req.body.description 

    if(!req_name){

      res.status(404).json({
        success: false,
        message: "Name field must be filled."
      })

    }else {

      let update = {
        name: req_name,
        name_slug: slugify(req_name),
        description: req_description,
        profile_credential: req_profile_credential,
      }
  
      const user = db.collection('users').doc(req_user_id)
  
      if(user.empty){
        res.status(404).json({
          success: false,
          message: "User not found."
        })
      }
  
      await user.update(update)
  
      res.status(200).json({
        success: true,
        message: "Update user profile success.",
      })

    }
    
  }catch(err){

    res.status(500).json({
      success: false,
      message: "Update user profile failed."
    })

  }
})

//create topics
app.post('/api/topics', async (req, res) => {

  try{

    let req_topic = req.body.topic
    let user_id = req.body.user_id

    if(!req_topic ){

      res.status(401).json({
        success: false,
        message: "Topic field is required.",
      })

    }else{

      const topicsRef = db.collection('topics')
      const topics = await topicsRef.where('topic', '==', req_topic).limit(1).get()
  
      if(!topics.empty){
        
        res.status(403).json({
          success: false,
          message: "A topic with the same title has already been created.",
        })
  
      }else{
  
        const data = {
          topic: req_topic,
          created_at: Timestamp.now(),
          user_id: user_id
        }
    
        db.collection('topics').add(data)
         
        res.status(200).json({
          success: true,
          message: "Create topic success.",
        })
  
      }

    }

  }catch(err){

    res.status(500).json({
      success: false,
      message: "Create topic failed (" + err.message + ")."
    })

  }
})

//get topic by user_id
app.post('/api/user/topics', async (req, res) => {

  try {

    let user_id = req.body.user_id

    if(!user_id){

      res.status(404).json({
        success: false,
        message: "User id is required."
      })

    }else {

      const topicsRef = db.collection('topics')
      const topics = await topicsRef.where('user_id', '==', user_id).get()

      topicsArray = []

      topics.forEach(doc => {
          const data = {
            id: doc.id,
            user_id: doc.data().id,
            topic: doc.data().topic,
            created_at: doc.data().created_at,
          }

          topicsArray.push(data)
      })

      res.status(200).json({
        success: true,
        message: "Get user topics succes",
        data: topicsArray
      })

    }
    
  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Get user topics failed"
    })

  }

})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})