import css from "./LoadingWheel.module.css";

const wheel = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

const delay = 0.1;

interface LoadingWheelProps {
    isVisible: boolean;
}

const LoadingWheel = ({ isVisible }: LoadingWheelProps) => {
    return (
        isVisible && (
            <div className={css.container}>
                <div className={css.loadingWheel}>
                    {wheel.map((deg, i) => (
                        <div
                            key={i}
                            style={{
                                transform: `translateX(-50%) rotate(${deg}deg)`,
                                animationDelay: i * delay + "s",
                                animationDuration: delay * wheel.length + "s"
                            }}
                        >
                            <div />
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};

export default LoadingWheel;
