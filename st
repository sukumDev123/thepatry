2.Android
2.1)RealTimeDbViewModel.kt
package android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.firebase
 
import android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.models.BulbsModel
import androidx.lifecycle.ViewModel
import com.google.android.gms.tasks.Task
import com.google.firebase.database.FirebaseDatabase
import java.util.*
 
class RealTimeDbViewModel : ViewModel(){
   private val firebaseDatabase = FirebaseDatabase.getInstance()
   private val nameR : String = "bulb-parant"
   val realTimeDBFireBase : RealTimeDBFireBaseLiveData = RealTimeDBFireBaseLiveData(nameR, firebaseDatabase)
   fun updateStatusBulb(status: Int? , child : String ) {
      status?.let {
          val firebaseProcess = firebaseDatabase.getReference(nameR).child(child)
          firebaseProcess.child("statusBulb").setValue(status).addOnSuccessListener {
              if(status == 1) {
                  firebaseProcess.child("")
                  firebaseProcess.child("createAt").setValue(Date().time)
              } else {
                  firebaseProcess.child("createAt").setValue(0)
 
              }
          }
 
      }
   }
 
   fun setTimeToBulb(child: String,   openOrOff : String, openOrOffV: Boolean ,  timeType: String ,time: Long) : Task<Void> {
       val firebaseProcess = firebaseDatabase.getReference(nameR).child(child)
       return firebaseProcess.child(openOrOff).setValue(openOrOffV).addOnSuccessListener {
           firebaseProcess.child(timeType).setValue(time)
       }
 
   }
 
   fun addNewBulb(bulb : BulbsModel? , nameChild : String ) : Task<Void>{
 
       return firebaseDatabase.getReference(nameR).child(nameChild).setValue(bulb)
 
   }
}




อธิบายการทำงาน
	 
บรรทัดที่ 9-42 โดยทั้งหมดนี้ผมได้อาศัย ViewModel ในการจัดการเป็นตัวกลางระหว่าง Activity และ Model โดย ViewModel จะจัดการเรื่อง lifecycle ให้ในระดับหนึ่ง โดยแต่ละ Function ที่ผทได้ทำการสร้างไว้ ผมต้องการที่จะรับข้อมูลจาก Realtime database ของ Firebase ผมจึงเรียกใช้ผ่านตัว RealTimeDBFireBaseLiveData ซึ่งตัวนี้จะ อาศัย LiveData ของ Android ในการจัดการข้อมูลโดยการทำงานของตัวนี้เราจะทำการ Observe ที่ตัว Activity และเมื่อค่ามีการเปรียนแปรง ค่าก็จะทำการอัพเดทให้ผ่านตัว LiveData ไปอัพเดท Activity เป็นต้น function updateStatusBulb เป็นการอัพเดทค่าของ หลอดไฟที่เราจะต้องการให้เปิดหรือปิด ไปยัง Firebase โดยเมื่อ Firebase ถูกอัพเดทข้อมูลจาก Android แล้วทางฝั่ง NodeMcu ที่มีการเชื่อมต่อ Wifi ไว้แล้วก็จะรับรู้ได้ทันทีว่า ค่านั้น เป็น 0 หรือ 1 และจะทำการ เปิด และปิดไฟ โดยบรรถัดที่ 15 จะเป็นการ เรียกเจ้าตัว firebase ว่าเราขอ ข้อมูลจาก ref นี้นะ และแต่ละ ref จะมีข้อมูลเป็น เสมือ json เมื่อเราต้องการอัพเดท เราจึง อ้าง child ที่เราต้องการอัพเดทค่า และ เราก็ทำการ setValue ของ child ตัวนั้นได้เลย และเมื่อผมนั้นได้ update child นั้นไปเรียบร้อยแล้ว ถ้าค่าที่ผมต้องการส่งไปเป็น 1 คือสถานะเปิดผมก็จะทำการ update child createAt เพื่อ บันทึกไว้ว่าผมอัพเคตค่าไป เวลาเท่าไหร่ เพื่อทำการคำนวนหาเวลาเปิด แต่ถ้าค่าที่ผมจะส่งเป็น 0 ผมก็จะทำการ อัพเดทค่าของ createAt เป็น 0 คือไฟนี้ได้ปิดไปแล้ว และก็มาถึง function setTimeToBulb จะเป็นการ จำกัดเวลาเปิดและปิด ผมจะทำการ update ค่าของ child นั้นๆเป็น จำกัดเวลาเปิด หรือ เวลาปิด และ เพิ่ม เวลาเปิดปิดเป็น หน่วย ms
ผมลืมบอกไป ตัวแปรที่ใส่มาใน parameter คือ child คือ อ้างอิงจาก , openOrOff ก็จะเป็น child ที่ผมทำการกำหนดแล้วใน firebase ว่าจะให้เป็น open or off และ ก็จะ กำหนดค่าใน Firebase ว่า กำหนดเวลาเปิดหรือ กำหนดเวลาปิด และเมื่แทำการเพิ่มสำเร็จแล้ว ผมก็จะรับ timeType จะเป็นตัว ref อีกเหมือนกันว่าอ้างอิงไปที่ไหน และ จะอัพเดตค่าไปที่ไหน เมื่อเสร็จแล้วผมก็จะอัพเดทค่า timeType และ openOrOff ใน firebase และ ก็มาถึงฟังก์ชันสุดท้ายของคราสคือ addNewBulb นี้จะเป็นการเพิ่มข้อมูลหลอดไฟไปในระบบเพื่ออนาคต อยากจะมีไฟเพิ่ม














2.2)RealTimeDBFireBaseLiveData.kt
package android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.firebase
 
import androidx.lifecycle.LiveData
import android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.models.BulbsModel
import android.util.Log
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
 
class RealTimeDBFireBaseLiveData(nameReference: String , fireBaseDb : FirebaseDatabase ) : LiveData<List<BulbsModel>>() {
   private val dbRef = fireBaseDb.getReference(nameReference)
   override fun onActive() {
       dbRef.addValueEventListener(valueEventListener)
   }
 
   override fun onInactive() {
       dbRef.removeEventListener(valueEventListener)
   }
   private val valueEventListener = object : ValueEventListener {
       override fun onCancelled(p0: DatabaseError) {
           Log.e("OnCanelled Firebase", p0.message)
       }
 
       override fun onDataChange(dataSnapshot: DataSnapshot) {
           if (dataSnapshot.exists()) {
               Log.i("Hello", "${dataSnapshot}")
               value = dataSnapshot.children.map{
                   snap -> snap.getValue(BulbsModel::class.java)!!
               }
               Log.i("!!!!", "${value}")
//
           }
 
 
       }
   }
 
}







อธิบายการทำงาน
	บรรทัดที่ 11-39 อธิบายโดยรวมคือ ผม ทำการ extent class นี้ด้วย LiveData 
ซึ่งเมื่อ App เริ่มทำงานก็จะเข้า ฟังก์ชั้น onActive และจะเรียก  dbRef.addValueEventListener(valueEventListener) นี้จะเป็น function สำหรับจัดการข้อมูลทาง Firebase โดยเมื่อ ข้อมูลมีการอัพเดท จะเข้า function onDataChange โดย function นี้จะมีการทำงานโดยที่เมื่อมีข้อมูลอัพเดทจะทำการแปลงข้อมูลที่เป็น JSON แปลงเป็น POJO และใช้กับ Class Model ของ android ได้เลยโดยทั้ง class นี้จะ return ค่า เป็น ListData<List<BulbsModel>>() โดย class นี้จะถูกเรียกจาก RealTimeDbViewModel
















2.3) activity_bulbs_list.xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/cardViewBulb"
    android:state_enabled="false"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginStart="16dp"
    android:layout_marginEnd="16dp"
    android:layout_marginTop="8dp"
    android:layout_marginBottom="8dp">
 
    <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/itemOn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="16dp"
 
        app:layout_constraintBottom_toBottomOf="@+id/textViewTitle"
        app:layout_constraintTop_toBottomOf="@+id/textViewTitle">
 
 
        <ImageView
            android:id="@+id/imageView"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:layout_marginEnd="8dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.513"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:srcCompat="@drawable/ic_lightbulb_outline_black_24dp" />
 
        <TextView
            android:id="@+id/textViewTitle"
            android:layout_width="wrap_content"
            android:layout_height="39dp"
            android:layout_marginTop="10dp"
            android:textColor="@color/textCloseB"
            android:textSize="20sp"
            android:textStyle="bold"
            app:layout_constraintEnd_toEndOf="@+id/imageView"
            app:layout_constraintHorizontal_bias="0.494"
            app:layout_constraintStart_toStartOf="@+id/imageView"
            app:layout_constraintTop_toBottomOf="@+id/imageView"
            tools:text="Name Bulbs" />
 
        <TextView
            android:id="@+id/countDownTime"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:layout_constraintTop_toBottomOf="@+id/textViewTitle"
            android:text="Show time."
            android:gravity="center"
            />
 
 
    </androidx.constraintlayout.widget.ConstraintLayout>
 
</androidx.cardview.widget.CardView>



2.4) BulbHolder.kt
package android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.adpter
 
import android.annotation.SuppressLint
import android.bulbs.sukumandroid.controlbulbswithandroid.R
import android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.logic.MoreControl
import android.graphics.Color
import androidx.recyclerview.widget.RecyclerView
import android.view.View
import kotlinx.android.extensions.LayoutContainer
import kotlinx.android.synthetic.main.activity_bulbs_list.*
import kotlinx.android.synthetic.main.activity_bulbs_list.view.*
 
 
class BulbHolder( override val containerView: View) : RecyclerView.ViewHolder(containerView) , LayoutContainer {
    fun setNameBulb(bulbName : String) {
        textViewTitle?.text = bulbName
    }
 
    fun setOnSwitchListener(listener: View.OnClickListener) {
        itemOn?.setOnClickListener(listener)
    }
    fun setCoutnDownTime(time: Long?, typeTime : String?, openOrClose : Int? ) {
        openOrClose?.let {
            if(it == 0) {
                countDownTime.setTextColor(Color.BLACK)
            }else {
                countDownTime.setTextColor(Color.WHITE)
 
            }
        }
        time?.let {
            typeTime?.let {
                countDownTime?.text = MoreControl().setCountDownTimeStart(time , typeTime )
            }
        }
    }
    fun openOrNot(status : Int) {
        if(status == 0) {
            cardViewBulb?.imageView?.setImageResource(R.drawable.ic_lightbulb_outline_black_24dp_off)
            cardViewBulb?.textViewTitle?.setTextColor(Color.rgb(98, 0, 238))
            cardViewBulb?.setBackgroundResource(R.drawable.shape_normal_f)
 
        } else {
            cardViewBulb?.imageView?.setImageResource(R.drawable.ic_lightbulb_outline_black_24dp)
            cardViewBulb?.textViewTitle?.setTextColor(Color.WHITE)
            cardViewBulb?.setBackgroundResource(R.drawable.shape_normal)
 
        }
    }
 
 
 
}







2.5)  BulbListAdpter.kt

package android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.adpter
 
import android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.models.BulbsModel
import android.bulbs.sukumandroid.controlbulbswithandroid.R
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
 
class BulbListAdpter : RecyclerView.Adapter<BulbHolder>() {
    private var bulbsList: List<BulbsModel>? = null
    private var listener: Listener? = null
    override fun onCreateViewHolder(parent: ViewGroup, p1: Int): BulbHolder = BulbHolder(LayoutInflater.from(parent.context).inflate(R.layout.activity_bulbs_list, parent, false))
 
 
    override fun getItemCount(): Int = bulbsList?.size ?: 0
 
    override fun onBindViewHolder(holder: BulbHolder, position: Int) {
        val bulb = bulbsList?.get(position)
        bulb?.let {
            val checkTime = checkCountDownTime(bulb)
            val timeCount = checkTime.time
            val typeTime = checkTime.typeTime
            holder.setCoutnDownTime(timeCount,typeTime, bulb.statusBulb)
            holder.setNameBulb(bulb.nameBulb)
            holder.openOrNot(bulb.statusBulb)
            holder.setOnSwitchListener(View.OnClickListener { view ->
                listener?.onBulbClick(bulb, view)
 
            })
 
        }
 
    }
 
    private fun checkCountDownTime(bulb: BulbsModel): CountTime = when {
        bulb.setClose -> CountTime(bulb.timeClose, "to close." )
        bulb.setOpen -> CountTime(bulb.timeStart, "to open." )
        else -> CountTime(0, "" )
    }
 
    fun setBulbList(bulbs: List<BulbsModel>) {
        this.bulbsList = bulbs
 
    }
 
    fun setListener(listener: Listener) {
        this.listener = listener
    }
 
    interface Listener {
        fun onBulbClick(bulb: BulbsModel, view: View)
    }
 
    data class CountTime(val time: Long?, val typeTime: String?)
 
}






อธิบายการทำงาน
	โดย class นี้ก่อที่จะสร้าง class จะต้อง import containerView จาก constructor โดยจะต้อง extent LayoutContainer และ recyclerView holder ก่อนและ จึงจะสามารถเรียกใช้เจ้าตัว containerView ได้โดย Function setNameBulb จะรับตัวแปล bulbName เป็น string เพื่อจัดการหน้า ui textViewTitle นี้คือ id ของ textview จาก file xml โดยที่ถ้าใครเขียน Android ด้วย Java อาจจะต้อง ใช้ findViewById แต่ผมเขียนด้วย Kotlin จึงใช้ในลักษณะแบบนี้ได้ และนี้จะเป็นการทำให้ บนหน้า ui ของเราจะแสดง bulbName จาก parameter ที่รับเข้ามา ต่อมาคือ function setOnSwitchListener นี้คือเมื่อ user กดไปที่ id นี้ก็จะเข้า function และต่อมาคือ function setCoutnDownTime time , typeTime และ openOrClose และใน function นี้ผมจะทำประมาณว่าถ้า openOrClose มีค่าไม่เท่ากับว่างก็จะให้ if openOrClose ที่ส่งมาเท่ากับ 0 จะ countDownTime ให้มี สี เท่ากับ สีดำ แต่ถ้าไม่ก็จะให้เท่ากับ ขาว และถ้า time ที่ส่งมามีค่าไม่เท่ากับว่าง countDownTime โชว์ ข้อมูลเวลาจาก Class MoreControl method setCountDownTimeStart และส่ง time กับ typeTime ไปทาง parameter ส่วยใน function openOrNot จะทำการเปลียนรูปเฉย โดยหลักการคือ ถ้าค่าเป็น 1 จะเปลียนรูปให้เป็น รูปที่เสมือไฟเปิด แต่ถ้า ค่า มีค่าเป็น 0รูปจะแสดงเสมือว่าไฟดับ 
	และในส่วนของ 2.7 จะรวม class ทั้งหมดไว้ที่เดียวกันทั้งไฟล์ที่ 2.5 และ 2.6 โดย class นี้คือ extent จาก  recyclerView adpter โดยอย่างแลกผมประกาศตัวแปรก่อน เพื่อรับข้อมูลของหลอดไฟทั้งหมดและส่วนของlistener และ function ส่วนใหญ่ implement มาจาก recyclerView Adpter เมื่อ adpter ถูกเรียกใช้จะเข้า function onCreateViewHolder ก่อนและ onCreateViewHolder จะสร้าง BulbHolder และอ้างอิง xml file จากตรงนี้ และ function ถัดไป getItemCount จะเป็นขนาดทั้งหมดเพื่อให้ recycler จัดการ list ให้ใน recyclerview ใน xml  และ function onBindViewHolder จะส่งholderมาและ position ในส่วนนี้เราจะเห็นได้ว่ามีการเรียกใช้ function ที่เราประกาศไว้ใน holder ถูกใช้เรียบร้อย และ เราจะเก็บข้อมูลหลอดไฟทั้งหมดไว้ในตัวแปรหนึ่งและ เรียก position นั้นๆที่ถูกส่งเข้ามาหลังจากนั้นเช็คว่า ข้อมูลหลอดไฟว่างไหมถ้าไม่ก็ให้ เรียก function checkCountDownTime ใส่ข้อมูลหลอดไฟหลังจากนั้นก็จะเป็นการใส่ตัวแปลไปใน holder  
	function setBulbList จะเป็นการนำข้อมูลหลอดไฟทั้งหมดมาใส่ในตัวแปรที่ได้ประกาศไว้ด้านบน สร้าง interface สำหรับ click จำลองขอ้มูล CountTime ใส่ time และ string


























2.6) fragment_list_of_bulb.xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".bulbs.modules.views.ListOfBulb"
    android:background="#fff"
    tools:layout_editor_absoluteY="81dp">
 
    <!-- TODO: Update blank fragment layout -->
    <TextView
        android:id="@+id/simpleText"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="56dp"
        android:layout_marginEnd="8dp"
        android:gravity="center"
 
        android:text="Control The Light."
        android:textColor="@color/colorPrimary"
        android:textSize="20dp"
        android:textStyle="bold"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
 
    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/bulbRecyclerView"
        android:layout_width="344dp"
        android:layout_height="wrap_content"
 
        android:layout_marginStart="8dp"
        android:layout_marginTop="20dp"
        android:layout_marginEnd="8dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/simpleText">
 
    </androidx.recyclerview.widget.RecyclerView>
    <ProgressBar
        android:id="@+id/progressBar"
        style="?android:attr/progressBarStyle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
 
</androidx.constraintlayout.widget.ConstraintLayout>



2.7) ListOfBulb.kt
package android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.views
 
 
import android.bulbs.sukumandroid.controlbulbswithandroid.R
import android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.adpter.BulbListAdpter
import android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.firebase.RealTimeDbViewModel
import android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.models.BulbsModel
import android.os.Bundle
import android.os.Handler
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.GridLayoutManager
import kotlinx.android.synthetic.main.fragment_list_of_bulb.*
import java.util.*
 
 
/**
 * A simple [Fragment] subclass.
 *
 */
class ListOfBulb : Fragment() {
   private lateinit var viewModel: RealTimeDbViewModel
   private lateinit var adpter: BulbListAdpter
   private var bulbData: List<BulbsModel>? = listOf()
 
   override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                             savedInstanceState: Bundle?): View? {
       // Inflate the layout for this fragment
 
       return inflater.inflate(R.layout.fragment_list_of_bulb, container, false)
   }
 
 
   override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
       super.onViewCreated(view, savedInstanceState)
       showLoading()
       activity?.let {
           it.title = "Home Page"
       }
       adpter = BulbListAdpter()
       bulbRecyclerView?.layoutManager = GridLayoutManager(context, 2)
       bulbRecyclerView?.adapter = adpter
       getObserFromFireBase()
       adpter.setListener(updateStatusBulb)
 
   }
 
   override fun onStart() {
       super.onStart()
       updateBulbTime()
 
   }
 
   private val updateStatusBulb =
           object : BulbListAdpter.Listener {
               override fun onBulbClick(bulb: BulbsModel, view: View) {
                   val statusB = if (bulb.statusBulb == 0) 1 else 0
                   viewModel.updateStatusBulb(statusB, bulb.key)
               }
           }
 
   private fun getObserFromFireBase() {
       viewModel = ViewModelProviders.of(this).get(RealTimeDbViewModel::class.java)
       viewModel.realTimeDBFireBase.observe(this, Observer<List<BulbsModel>> { bulbs ->
           bulbData = bulbs
 
           updateBulb(bulbs)
           showContent()
       })
   }
 
   private fun updateBulb(bulbs: List<BulbsModel>?) {
       bulbs?.let {
           adpter.setBulbList(bulbs)
           adpter.notifyDataSetChanged()
       }
 
   }
 
   private fun showLoading() {
       bulbRecyclerView?.visibility = View.GONE
       progressBar?.visibility = View.VISIBLE
   }
 
   private fun showContent() {
       bulbRecyclerView?.visibility = View.VISIBLE
       progressBar?.visibility = View.GONE
   }
 
   private fun updateBulbTime() {
       val mHandler = Handler()
       val mTimer = Timer()
       mTimer.schedule(object : TimerTask() {
           override fun run() {
               bulbData?.let {
//                    adpter.setBulbList(it)
                   mHandler.post{
                       updateBulb(it)
 
                   }
               }
           }
       }, 0, 1000)
   }
 
}



อธิบายการทำงาน
	class นี้ extent จาก Fragment
	บรรทัดที่ 26-27 เป็นการประการตัวแปลซึ่งในส่วนนี้จะต่อจากที่ได้กล่าวมาสองไฟล์ด่านบนคือ ไฟล์ RealTimeDbViewModel.kt ซึ่งใน class นี้เราจะทำการเรียกใช้ class นี้แล้ว ด้วยกำหนดให้ตัวแปรชื่อ viewModel โดยประกาศเป็น private และกำหนดว่าค่านี้จะมีตัวแปรแน่ๆ และ ในส่วนต่อไปจะเป็นการเรียกใช้ adpter ในการแสดงหน้า ui เป็น list ของแต่ละหลอดไฟว่ามีสถานะอยู่ในโหมดไหนเปิดหรือปิด โดยจะอธิบายการทำงานของ BulbListAdpter แบบย่อๆคือ คราสนี้จะจัดการเรื่อง list ที่จะไปแสดงในหน้า xml โดยทั้งหมดนี้จัดการโดยใช้ RecyclerView โดย RecyclerView จำเป็นต้องสร้าง adpter และ ใน adpter จำเป็นต้องสร้าง holder และ เมื่อมี holder เรียบร้อยผมก็เลยสร้าง class BulbListAdpter มาเพื่อมาเป็น adpter และเมื่อมี adpter แล้วผมจึงเอา adpter มาจัดการในส่วนของ list และจะจัดการยังไงเดียวจะอธิบายอีกที เมื่อถึงบรรถัดที่เกี่ยวข้องการ List และต่อมาผมก็ได้ประกาศตัวแปรไว้สำหรับเก็บข้อมูลของหลอดไฟเป็น List ชื่อตัวแปลว่า bulbData โดยจะกำหนเให้เป็นค่าว่างก่อน

	บรรทัดที่ 38-43 onViewCreated จะทำการรันเมื่อ Fragment นี้ถูกสร้างโดยเมื่อถูกสร้างเรียบร้อยแล้ว showLoding() เป็นการโชว์ progressBar และซ้อน recyclerview การทำงานจะอยู่ที่ บรรทัด 84-87 และก็กำหนด title ของ application ให้ ชื่อว่า Home page และแล้วเราก็ได้มาจัดการ adpter เรียบร้อยทำการสร้าง adpter โดยให้ adpter เท่ากับ BulbListAdpter() และ กำหนด recyclerview layout ให้เป็น GridLayoutManager โดยให้มีจำนวน 1 แถว 2 ข้อมูลนั้นเอง และ ในตัวของ recyclerview จะมีตัว adpter อยู่ผมก็เลย เอา adpter ที่ผมสร้างไว้ ให้เท่ากับ adpter ของ recyclerview โดยเมื่อข้อมูลจาก adpter ของผมถูกสร้างขึ้นตัวนี้ก็จะทำการอัพเดตเองตามความเหมาะสมของข้อมูลที่ผมได้ทำการกำหนดไว้ใน class BulbListAdpter() จากนั้นผมก็จะทำการเรียกฟังก์ชันที่เกียวกับ Firebase โดยเรียก ฟังก์ชัน getObserFromFireBase()
หลังจากนั้นให้ไปดูที่บรรทัดที่ 66-74 โดยอย่างแรก เราจะนำตัวแปร viewModel ที่ประกาศไว้ข้างบนกำหนดค่าไว้ให้เท่ากับ ViewModelProviders โดย เรียกจาก RealTimeDBViewModel และหลังจากที่กำหนเดรียบร้อยแล้ว เราสามารถเรียกใช้ฟังชั่นได้ตามบรรทัดต่อมาเลยโดยหลังการของตัวนี้คือ จะรอค่าอัพเดตจากตัว Firebase เมื่อค่ามีการอัพเดต class ที่ observe ไว้ก็จะได้รับข้อมูลเหมือนกันทุกตัวจากนั้น เมื่อข้อมูลมีการอัพเดตก็นำ bulbData เท่ากับข้อมูลที่ได้รับมาจาก Firebase และทำการเรียกฟังก์ชัน updatebulb โดยส่งข้อมูล ของ bulb ไปด้วยและเมื่อเรียกแล้วเราก็จะมาดูกันว่า updatebulb ทำงานยังไงให้ไปดูที่ บรรถัด 76-80 อย่างแรกตรวจสอบว่าค่าเป็นว่างหรือไม่ถ้าไม่ก็จะทำงานใน ตัว lamda จากนั้น ให้ทำการกำหนดข้อมูล adpter ลงไป เรียกใช้ฟังก์ชันที่ชื่อว่า setBulbList และโยน bulbData ทั้งหมดไปใส่ใน ฟังก์ชันนี้ จากตอนแรกที่เราได้ประกาศ adpter ไว้ด้านบนตอนแรกจะเป็นค่าว่างยังไม่มีข้อมูล แต่มาตอนนี้ไม่ว่างแล้วนะครับ หลังจากนนั้นทำการ เรียกใช้ฟังก์ชัน ในการอัพเดต recyclerview คือ notifyDataSetChanged และก็จบไปอีกหนึ่ง function พอออกมาจะเห็นกับ adpter.setListner(updateStatusBulb) โดยมี object คือ updateStatusBulb ใส่ลงไปด้วยมันคืออะไรใน เดียวผมจะบอก คือผมต้องการให้คลิกจาก recyclerview ได้ปกติถ้าเราต้องการที่จะคลิกจาก avtibity หรือ จาก button อะไรก็แล้วแต่ เราต้องเรียก setOnClickListener จึงจะคลิกได้ และใช้ เมื่อผมทำใน recyclerview ผมก็ต้องใช้เหมือนกันแต่ในคราสของ adpter หรือ holer มันไม่มีให้ผม ผมจึงต้องเอา onclickListener ส่งไปทางช่องนี้แหละครับ นั้นก็เลยเป็นที่มาว่าทำไมผมถึงต้องทำแบบนี้

	บรรทัดที่ 54 มันคืออะไร ผมจะมาบอกตอนนี้แหละครับก่อนที่จะบอกฟังก์ชันนี้ถูกสร้างที่บรรทัด 94-108 โดยฟังก์ชั้นนี้จะทำการวนตัวเองไปเรื่อยๆทุก 1 วินนาที และทำโปรเซสที่อยู่ lamda ทุกๆ 1 วิ นั้นเอง โดยผมเอาไว้สำหรับดูเวลา เปิด หรือ ปิดไฟ ว่าเหลือเวลาอีกเท่าไหร่ ซึ่งมันก็สมเหตุสมผลในการประการแบบนี้โดยในฟังก์ชันนี้ก็คือจะเกียวกับ reclcerview นั้นแหละครับ โดยต่อไปผมจะอธิบายถึงหลักการที่ผมจัดการตั้งเวลานะครับ




























2.8)MoreControl.kt
package android.bulbs.sukumandroid.controlbulbswithandroid.bulbs.modules.logic
 
import java.util.*
 
class MoreControl {
 
 
   fun setCountDownTimeStart(date: Long , typeTime: String): String {
       if (date > 0) {
           var dateSelect = Date(date).time -  Date().time
           if (dateSelect > 0) {
               dateSelect /= 1000
               var dateDouble: Double = dateSelect.toDouble()
               dateDouble = Math.floor(dateDouble)
               val wan: Double = Math.floor(dateDouble / 86400)
               val l_wan: Double = dateDouble % 86400
               val hour: Double = Math.floor(l_wan / 3600)
               val l_hour: Double = l_wan % 3600
               val minute: Double = Math.floor(l_hour / 60)
               val second: Double = l_hour % 60
               if (wan == 0.toDouble() && hour == 0.toDouble() && minute == 0.toDouble() && second == 0.toDouble()) {
                   return "Time left : ${wan.toInt()} วัน ${hour.toInt()}:${minute.toInt()}:${second.toInt()} $typeTime"
               }
               return "Time left : ${hour.toInt()}:${minute.toInt()}:${second.toInt()} $typeTime"
 
 
           } else {
               return "0 s."
           }
 
       }
       return "Set Countdown time."
   }
 
   fun setTimeStart(date: Long): String {
       if (date > 0) {
           var dateSelect = Date().time - Date(Date(date).time).time
           if (dateSelect > 0) {
               dateSelect /= 1000
               var dateDouble: Double = dateSelect.toDouble()
               dateDouble = Math.floor(dateDouble)
               val wan: Double = Math.floor(dateDouble / 86400)
               val l_wan: Double = dateDouble % 86400
               val hour: Double = Math.floor(l_wan / 3600)
               val l_hour: Double = l_wan % 3600
               val minute: Double = Math.floor(l_hour / 60)
               val second: Double = l_hour % 60
               if (wan == 0.toDouble() && hour == 0.toDouble() && minute == 0.toDouble() && second == 0.toDouble()) {
                   return "${wan.toInt()} วัน ${hour.toInt()}:${minute.toInt()}:${second.toInt()}"
               }
               return "${wan.toInt()} วัน ${hour.toInt()}:${minute.toInt()}:${second.toInt()}"
 
 
           } else {
               return "0 s."
           }
 
       }
       return "0 s."
   }
   fun checkTypeTime(time: String): Boolean
           = Regex("[0-9]+[s,m,h][.]*").matches(time)
 
   fun setTimeSecond(time : String) : Long
           = (Regex("[s,m,h]+[.]*").split(time)[0].toInt() * 1000).toLong()
 
   fun setTimeMin(time: String) : Long
           = (Regex("[s,m,h]+[.]*").split(time)[0].toInt() * 60000).toLong()
 
   fun setTimeHour(time: String) : Long
           = (Regex("[s,m,h]+[.]*").split(time)[0].toInt() * 3600000).toLong()
 
   fun setTimeOn(time: String) : Long {
       if(checkTypeTime(time)) {
           val typeTime : String = Regex("[0-9]+").split(time)[1]
           return when (typeTime) {
               "h", "h." -> setTimeHour(time)
               "m", "m." -> setTimeMin(time)
               "s", "s." -> setTimeSecond(time)
               else -> 0
           }
       }
       return 0
   }
 
}






อธิบายการทำงาน
	การทำงานของ function setCountDownTimeStart ในส่วนของการทำงานนี้จะเป็นการทำงานส่วนของการ นับเวลาถอยหลังในการเปิดหรือปิดโดยหลักการโค๊ดข้าวๆ คือ ถ้าเวลาที่รับมา มาก กว่า 0 ก็จะทำงานต่อถ้าไม่ก็จะreturn กลับไปเป็น 0 วิ หลังจากนั้น คำนวนว่ากี่วัน กี่ชั่วโมง กี่นาที กี่วินาทีเป็นต้น
	
	การทำงานของ function setTimeStart คือ คล้ายกับ setCountDownTimeStart แต่จะต่างกันตรงที่ setTimeStart จะเป็นการนับเวลาไปเรื่อยๆ แต่ setCountDownTimeStart จะเป็นนับเวลาถอยหลัง
	
	การทำงานของ function checkTypeTime คือเช็คความถึงต้องตามที่ผมต้องการอธิบายก็คือต้องเป็น ตัวเลขมากกว่า 1 แล้วต้องมี s,m,h และมี . หรือ ไม่มีก็ได้
	
	การทำงานของ function setTimeSecond จะเป็นการตัดตัวอังษรออกเอาแต่ตัวเลข และ ทำการ คูณ ด้วย 1000 เพื่อ ตัวเลขจะมีหน่อยเป็น ms

	การทำงานของ function setTimeMin จะเป็นการตัดตัวอังษรออกเอาแต่ตัวเลข และ ทำการ คูณ ด้วย 60000 เพื่อ ตัวเลขจะมีหน่อยเป็น ms

	
การทำงานของ function setTimeHour จะเป็นการตัดตัวอังษรออกเอาแต่ตัวเลข และ ทำการ คูณ ด้วย 3600000 เพื่อ ตัวเลขจะมีหน่อยเป็น ms

	การทำงานของ function setTimeOn จะเป็นการรวมทุกๆ function ข้างบนและทำการแยกไปตามความต้องการของแต่ละคนที่ใส่มา โดยถ้าเป็น s,s. จะเป็นวินาที ถ้าเป็น m,m. จะเป็น นาที ถ้าเป็น h,h. จะเป็นชั่วโมงเป็นต้นโดยทั้งหมดที่กล่าวมาข้างต้นนี้สามารถเช้าไปดูโปรแจ็ค Android ได้ที่
https://github.com/sukumDev123/ControlBulbsWithAndroid โดย เปลียน branch จาก master เป็น dev
