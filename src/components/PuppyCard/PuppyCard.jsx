import { Link } from 'react-router-dom'

function PuppyCard({ puppy, randDogImgId }) {
  return (
    <div className="card">
      <img
        src={`https://picsum.photos/id/${randDogImgId}/640/480`}
        alt="A happy puppy"
        className="card-img-top"
      />
      <div className="card-body">
        <h2 className="card-text">{puppy.name}</h2>
        <p className="card-text">{puppy.age}-year-old {puppy.breed}</p>
      </div>
    </div>
  )
}

export default PuppyCard