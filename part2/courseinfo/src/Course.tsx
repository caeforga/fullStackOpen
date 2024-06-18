const Header = ({ course }: any) => <h2>{course}</h2>

const Total = ({ sum }: any) => <h3>Total of exercises {sum}</h3>

const Part = ({ part }: any) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }: any) =>
    <>
        {parts.map((part: any) =>
            <Part
                key={part.id}
                part={part}
            />
        )}
    </>

const Course = ({course} : any) => {

    const sum = course.parts.reduce((a: any, b: any) => a + b.exercises, 0)

    return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={sum} />
    </div>
    )
}

export default Course;