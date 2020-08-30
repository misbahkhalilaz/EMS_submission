import React, { useState, useEffect } from "react";
import { Message, ChatFeed } from "react-chat-ui";
import { Tooltip, Input } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import { socket } from "../../containers/App";
import { connect } from "react-redux";
import { addProjChat } from "../../redux/actionCreators";

const Chat = (props) => {
	const msgEnd = React.createRef();
	const [msgInput, setMsgInput] = useState("");
	const [ph, setPh] = useState("type message...");
	const [prevId, setPrevId] = useState(props.proj_id);
	let [messages, setMessages] = useState([]);

	useEffect(() => {
		setMessages(
			props.projects.filter((proj) => proj._id === props.proj_id)[0]
				? props.projects
						.filter((proj) => proj._id === props.proj_id)[0]
						.chat.map(
							(msg) =>
								new Message({
									id: msg.sender_id === props.myId ? 0 : msg.sender_id,
									message: (
										<Tooltip
											title={new Date(msg.timestamp * 1000).toLocaleString()}
										>
											{msg.message}
										</Tooltip>
									),
									sender: msg.sender_name,
								})
						)
				: []
		);
		console.log(messages);
	}, [props.proj_id, props.projects]);

	// useEffect(() => {
	// 	setMessages([
	// 		...messages,
	// 		props.projChat
	// 			.filter((chat) => chat._id === props.proj_id)
	// 			.map((msg) => msg.message)
	// 			.map(
	// 				(msg) =>
	// 					new Message({
	// 						id: msg.sender_id === props.myId ? 0 : msg.sender_id,
	// 						message: (
	// 							<Tooltip
	// 								title={new Date(msg.timestamp * 1000).toLocaleString()}
	// 							>
	// 								{msg.message}
	// 							</Tooltip>
	// 						),
	// 						sender: msg.sender_name,
	// 					})
	// 			),
	// 	]);
	// }, [props.projChat]);

	useEffect(() => {
		msgEnd.current.scrollIntoView({ behaviour: "smooth" });
	});

	return (
		<>
			<Scrollbars style={{ height: 520 }}>
				<ChatFeed
					messages={messages}
					showSenderName={true}
					bubblesCentered={false}
					bubbleStyles={{
						text: {
							fontSize: 14,
						},
						chatbubble: {
							borderRadius: 30,
							padding: 10,
						},
					}}
				/>
				<div ref={msgEnd}></div>
			</Scrollbars>

			<Input
				placeholder={ph}
				value={msgInput}
				onChange={(e) => {
					setMsgInput(e.target.value);
				}}
				onKeyPress={(e) => {
					if (e.charCode === 13) {
						socket.emit("chat", props.proj_id, {
							message: msgInput,
							sender_id: props.myId,
							sender_name: props.myName,
							timestamp: parseInt(
								new Date(Date.now()).getTime() / 1000 + 5 * 3600
							),
						});
						setMsgInput("");
					}
				}}
				style={{
					backgroundColor: "#f2f2f0",
					position: "absolute",
					bottom: "10px",
					right: "10px",
					width: "24.5vw",
					borderRadius: "10px",
					borderColor: "#f2f2f0",
				}}
			/>
		</>
	);
};

const mapStateToProps = (state, ownProps) => ({
	projects: state.projects,
	projChat: state.projChat,
	myId: state.bio._id,
	myName: state.bio.first_name + " " + state.bio.last_name,
});

export default connect(mapStateToProps, { addProjChat })(Chat);
