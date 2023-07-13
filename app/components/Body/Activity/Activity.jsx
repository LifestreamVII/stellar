import React from 'react'

const Activity = () => {
  return (
    <div>
        <div className="row">
            <div className="u__align--left">
                <h1 className="captionxl u__fs__h1 mb-none">Featured Now</h1>
                <p>This section has just been updated.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-10 u__disp--flex u__flex--left">
                <div class="myCard">
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title">FRONT SIDE</p>
                            <p>Hover Me</p>
                        </div>
                        <div class="backSide">
                            <p class="title">BACK SIDE</p>
                            <p>Leave Me</p>
                        </div>
                    </div>
                </div>
                <div class="myCard">
                    <div class="innerCard">
                        <div class="frontSide">
                            <p class="title">FRONT SIDE</p>
                            <p>Hover Me</p>
                        </div>
                        <div class="backSide">
                            <p class="title">BACK SIDE</p>
                            <p>Leave Me</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Activity